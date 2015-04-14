var express = require('express');
var app = express();
var pg = require('pg');
var auth = require('/users/auth.js');
var api = require('./Server/cron.js');

app.use(express.static(__dirname + '/../Client'));

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

app.get('/db', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('Select * From Users', function(err, result){
      done();
      if(err){
        throw err;
      } else { 
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

// testing api functionality
app.get('/test-api-insert', function(request, response){
  api.test();
});

app.listen(process.env.PORT || 5000)


app.post('/signup', auth.signup)
app.post('/signin', auth.signin)
// app.post('/home', )