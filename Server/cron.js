var request = require('request-promise');
var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet';

var db = require('knex')({
  client: 'pg',
  connection: databaseUrl
});

module.exports.test = function () {
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
                venue_address: meetup.venue.address_1,
                venue_city: meetup.venue.city,
                venue_state: meetup.venue.state,
                venue_lat: meetup.venue.lat,
                venue_lon: meetup.venue.lon,
                group_name: meetup.group.name,
                group_urlname: meetup.group.urlname,
                group_how_to_find: meetup.how_to_find_us
              })
              .catch(function(err){
                console.log('ERROR ON UPDATE:', err);
              })
          }

        }) // end of .then (insert/update)
      }) // end of data.map()

    })
    .catch(function (error){
      if (error) {
        console.error('error:', error);
      }
    });
}
