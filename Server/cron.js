var request = require('request');
var db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

// var options = {
//  method: 'GET'
//  url: 'https://api.meetup.com',
//  path: '/2/open_events'
// }
// 

module.exports.test = function () {
  request('https://api.meetup.com/2/open_events?&category=34&zip=78701&radius=20&page=1&key='+process.env.MEETUP_KEY, function (error, response, body){
      if (error) {
        console.error('error:', error);
      }

      var meetup = body.results[0];

      db.insert({
        api_event_id: meetup.id,
        event_name: meetup.name,
        event_description: meetup.description,
        event_url: meetup.id,
        event_time: meetup.time,
        event_duration: meetup.duration,
        venue_address: meetup.venue.address_1,
        venue_city: meetup.venue.city,
        venue_state: meetup.venue.state,
        venue_longitude: meetup.venue.lon,
        venue_latitude: meetup.venue.lat,
        group_name: meetup.group.name,
        group_urlname: meetup.group.urlname,
        group_how_to_find: meetup.how_to_find_us,
        api_group_id: meetup.group.id
      }, 'id')
      .into('meetups');

      response.send(body.results);
  })
};

