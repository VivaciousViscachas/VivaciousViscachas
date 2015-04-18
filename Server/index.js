var express = require('express');
var app = express();
var pg = require('pg');
var auth = require('./users/auth.js');
var bodyParser = require('body-parser');
var api = require('./cron');

app.use(express.static(__dirname + '/../Client'));
app.use(bodyParser.json())

//Access heroku-hosted db from terminal using: heroku pg:psql

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet';

// DEBUGGING
app.get('/meetups', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('SELECT id, event_name FROM meetups ORDER BY id', function(err, result){
      done();
      if(err){
        throw err;
      } else {
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

// DEBUGGING
app.get('/users', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('SELECT id, first_name, email FROM users ORDER BY first_name', function(err, result){
      done();
      if(err){
        throw err;
      } else {
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

// DEBUGGING
app.get('/starred', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('SELECT * FROM starred order by id', function(err, result){
      done();
      if(err){
        throw err;
      } else {
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

app.listen(process.env.PORT || 5000)
console.log('Server listening on port ' + 5000)


app.post('/signup', auth.signup)
app.post('/signin', auth.signin)
app.post('/mymeetups', auth.starred)
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
    var data =  [
      {"name" : "the austin linux meetup",
        "members" : 11000
      },
      {"name" : "the austin javascript meetup",
      "members" : 1223123
      }
    ]

    response.end(JSON.stringify(data));
})







