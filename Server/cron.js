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
  // Call the API to get the next 10 tech meetups in Austin
  request('https://api.meetup.com/2/open_events?&category=34&status=upcoming&zip=78701&radius=20&page=10&key='+process.env.MEETUP_KEY, function (error, response, body){
      if (error) {
        console.error('error:', error);
        response.send(500);
      }

      var data = JSON.parse(body).results;

      if (!data) {
        console.error("error!");
        response.send(500);
      }

      pg.connect(databaseUrl, function (err, client, done) {
        for (var i = 0, len < data.length; i < len; i++) {
          var meetup = data[i];
          
          client.query('SELECT api_event_id, event_updated FROM meetups WHERE api_event_id = $1', [meetup.id], function (err, result){
            if (err) {
              console.error("error!");
              response.send(500);
            }

            var data;
            if (result.rows.length) {
              data = result.rows[0];
            }

            if (data === undefined) {
              client.query('INSERT INTO meetups (api_event_id, event_name, event_description, event_url, event_time, event_updated, event_duration, venue_address, venue_city, venue_state, venue_lat_lon, group_name, group_urlname, group_how_to_find, api_group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, POINT($11,$12), $13, $14, $15, $16);', [meetup.id, meetup.name, meetup.description, meetup.event_url, meetup.time, meetup.updated, meetup.duration, meetup.venue.address_1, meetup.venue.city, meetup.venue.state, meetup.venue.lat, meetup.venue.lon, meetup.group.name, meetup.group.urlname, meetup.how_to_find_us, meetup.group.id], function (err, result) {
                  done();
                  if (err) {
                    console.error("error!");
                  } else {
                    console.log('Row(s) inserted:', result);
                  }
              });
            } else if (Number(data.event_updated) !== meetup.updated) {
              client.query('UPDATE meetups SET (event_name, event_description, event_url, event_time, event_updated, event_duration, venue_address, venue_city, venue_state, venue_lat_lon, group_name, group_urlname, group_how_to_find, api_group_id) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, POINT($10,$11), $12, $13, $14, $15) WHERE api_event_id = $16;', [meetup.name, meetup.description, meetup.event_url, meetup.time, meetup.updated, meetup.duration, meetup.venue.address_1, meetup.venue.city, meetup.venue.state, meetup.venue.lat, meetup.venue.lon, meetup.group.name, meetup.group.urlname, meetup.how_to_find_us, meetup.group.id, meetup.id], function (err, result) {
                done();
                if (err) {
                  console.error("error!");
                }
              });
            }
        }
      });
    })
  })
}
