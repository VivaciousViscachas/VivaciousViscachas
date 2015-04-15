var request = require('request');
var pg = require('pg');
var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet';
// var db = require('knex')({
//   client: 'pg',
//   connection: 'postgres://localhost/devmeet'
// });

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

      var data = JSON.parse(body).results;

      if (!data) console.error("error!")

      var meetup = data[0];

      pg.connect(databaseUrl, function (err, client, done) {
        client.query('INSERT INTO meetups (api_event_id, event_name, event_description, event_url, event_time, event_duration, venue_address, venue_city, venue_state, venue_lat_lon, group_name, group_urlname, group_how_to_find, api_group_id) VALUES ($1, $2, $3, $4, to_timestamp($5), to_timestamp($6), $7, $8, $9, POINT($10,$11), $12, $13, $14, $15);', [meetup.id, meetup.name, meetup.description, meetup.event_url, meetup.time, meetup.duration, meetup.venue.address_1, meetup.venue.city, meetup.venue.state, meetup.venue.lat, meetup.venue.lon, meetup.group.name, meetup.group.urlname, meetup.how_to_find_us, meetup.group.id], function (err, result) {
            done();
            if (err) {
              throw err;
            } else {
              console.log('Row(s) inserted!');
            }
        })
      });
  })
};

