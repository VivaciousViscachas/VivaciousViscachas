var CronJob = require('cron').CronJob,
    request = require('request-promise'),
    databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet',
    db = require('knex')({
      client: 'pg',
      connection: databaseUrl
    });

// Runs every night at midnight
var update = new CronJob('00 00 * * * *',
  callAPI,
  function(){ console.log('Cron called API') }, // function to run when callAPI is done
  true, // start now (when server spins up)
  'America/Chicago'
);

function callAPI () {
  // Call the API to get the next tech meetups in Austin
  request('https://api.meetup.com/2/open_events?&category=34&status=upcoming&zip=78701&radius=20&key='+process.env.MEETUP_KEY)
    .then(function (response){

      var data = JSON.parse(response).results;

      if (!data) {
        console.error("Error, data is undefined!");
      }

      data.map(function (meetup){

        // see if meetup exists in database
        db.select('api_event_id','event_updated')
          .from('meetups')
          .where('api_event_id', meetup.id)

        .then(function(result){

          var record = result[0];

          // if no meetup, insert it
          if (!record) {
            db('meetups')
              .insert({
                api_event_id: meetup.id,
                event_name: meetup.name,
                event_description: meetup.description,
                event_url: meetup.event_url,
                event_time: meetup.time,
                event_updated: meetup.updated,
                event_duration: meetup.duration,
                venue_address: meetup.venue && meetup.venue.address_1,
                venue_city: meetup.venue && meetup.venue.city,
                venue_state: meetup.venue && meetup.venue.state,
                venue_lat: meetup.venue && meetup.venue.lat,
                venue_lon: meetup.venue && meetup.venue.lon,
                group_name: meetup.group && meetup.group.name,
                group_urlname: meetup.group && meetup.group.urlname,
                group_how_to_find: meetup.group && meetup.how_to_find_us,
                api_group_id: meetup.group && meetup.group.id
              })
              .catch(function(err){
                console.log('ERROR ON INSERT:', err);
              })

          // if meetup, check last updated time, update if necessary
          } else if (Number(record.event_updated) !== meetup.updated) {
            db('meetups')
              .where('api_event_id', meetup.id)
              .update({
                event_name: meetup.name,
                event_description: meetup.description,
                event_url: meetup.event_url,
                event_time: meetup.time,
                event_updated: meetup.updated,
                event_duration: meetup.duration,
                venue_address: meetup.venue && meetup.venue.address_1,
                venue_city: meetup.venue && meetup.venue.city,
                venue_state: meetup.venue && meetup.venue.state,
                venue_lat: meetup.venue && meetup.venue.lat,
                venue_lon: meetup.venue && meetup.venue.lon,
                group_name: meetup.group && meetup.group.name,
                group_urlname: meetup.group && meetup.group.urlname,
                group_how_to_find: meetup.group && meetup.how_to_find_us,
                api_group_id: meetup.group && meetup.group.id
              })
              .catch(function(err){
                console.log('ERROR ON UPDATE:', err);
              })
          }

        }) // end .then (insert/update)
      }) // end data.map()
    }) // end .then (after API request)
     
    .catch(function (error){
      if (error) {
        console.error('error:', error);
      }
    });
}
