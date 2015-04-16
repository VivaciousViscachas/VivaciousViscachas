var express = require('express');
var app = express();
var pg = require('pg');
var auth = require('/auth.js');

app.use(express.static(__dirname + '/../Client'));


//Access heroku-hosted db from terminal using: heroku pg:psql

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet';

app.get('/db', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('Select * From meetups', function(err, result){
      done();
      if(err){
        throw err;
      } else { 
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

<<<<<<< HEAD
// testing api functionality (check /db for success)
=======
// testing api functionality (check DB for success)
>>>>>>> 647cec452360e6227b4ee1d40bf170a69526310a
app.get('/test-api-insert', function(request, response){
  api.test();
});

app.listen(process.env.PORT || 5000)
console.log('Server listening on port ' + 5000)


// app.post('/signup', )
// app.post('/signin', )
app.get('/feed', function(request, response){
  // pg.connect(databaseUrl, function (err, client, done){
  //   client.query('Select * From Meetups', function (err, result){
  //     if(err){
  //       throw err
  //     } else {
  //       response.send(JSON.stringify(results));
  //     }
  //   })
  // })
    var data = {
      "results": [
        {"name" : "the austin linux meetup",
          "members" : 11000
        },
        {"name" : "the austin javascript meetup",
        "members" : 1223123
        }
      ]
    }
    response.end(JSON.stringify(data));
});