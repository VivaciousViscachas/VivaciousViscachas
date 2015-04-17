var request = require('request');
var pg = require('pg');
var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet';
// var db = require('knex')({
//   client: 'pg',
//   connection: 'postgres://localhost/devmeet'
// });

module.exports.test = function () {
  // Call the API to get the next 10 tech meetups in Austin
  request('https://api.meetup.com/2/open_events?&category=34&status=upcoming&zip=78701&radius=20&page=10&key='+process.env.MEETUP_KEY)
    .then(function (response){

      var data = JSON.parse(response).results;

      if (!data) {
        console.error("Error, data is undefined!");
      }

      for (var i = 0, len = data.length; i < len; i++) {
        var meetup = data[i];
        console.log('\n\nmeetup:\n\n', meetup)

        db.select('api_event_id, event_updated')
          .from('meetups')
          .where('api_event_id', meetup.id)
        .then(function(result){
          var record;
          if (result.rows.length) {
            record = result.rows[0];
            console.log('record:', record)
          }

          if (record === undefined) {
            db.insert({
              api_event_id: meetup.id,
              event_name: meetup.name,
              event_description: meetup.description,
              event_url: meetup.event_url,
              event_time: meetup.time,
              event_updated: meetup.updated,
              event_duration: meetup.duration,
              venue_address: meetup.venue.address_1,
              venue_city: meetup.venue.city,
              venue_state: meetup.venue.state,
              venue_lat_lon: 'POINT('+meetup.venue.lat+','+meetup.venue.lon+')',
              group_name: meetup.group.name,
              group_urlname: meetup.group.urlname,
              group_how_to_find: meetup.how_to_find_us,
              api_group_id: meetup.group.id,
              })
              .into('meetups')

            // client.query('INSERT INTO meetups (api_event_id, event_name, event_description, event_url, event_time, event_updated, event_duration, venue_address, venue_city, venue_state, venue_lat_lon, group_name, group_urlname, group_how_to_find, api_group_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, POINT($11,$12), $13, $14, $15, $16);', [meetup.id, meetup.name, meetup.description, meetup.event_url, meetup.time, meetup.updated, meetup.duration, meetup.venue.address_1, meetup.venue.city, meetup.venue.state, meetup.venue.lat, meetup.venue.lon, meetup.group.name, meetup.group.urlname, meetup.how_to_find_us, meetup.group.id], function (err, result) {
            //     done();
            //     if (err) {
            //       console.error("error!", err);
            //     } else {
            //       console.log('Row(s) inserted:', result);
            //     }
            // });
          } else if (Number(record.event_updated) !== meetup.updated) {
            client.query('UPDATE meetups SET (event_name, event_description, event_url, event_time, event_updated, event_duration, venue_address, venue_city, venue_state, venue_lat_lon, group_name, group_urlname, group_how_to_find, api_group_id) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, POINT($10,$11), $12, $13, $14, $15) WHERE api_event_id = $16;', [meetup.name, meetup.description, meetup.event_url, meetup.time, meetup.updated, meetup.duration, meetup.venue.address_1, meetup.venue.city, meetup.venue.state, meetup.venue.lat, meetup.venue.lon, meetup.group.name, meetup.group.urlname, meetup.how_to_find_us, meetup.group.id, meetup.id], function (err, result) {
              done();
              if (err) {
                console.error("error!");
              }
            });
          }

          
          
        })


    //       });
    //     }
    //   });
    // })
    .catch(function (error){
      if (error) {
        console.error('error:', error);
        response.send(500);
      }
    });


}
