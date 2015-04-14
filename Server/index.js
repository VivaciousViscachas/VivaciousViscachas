var express = require('express');
var app = express();
var pg = require('pg');
var auth = reqiure('/users/auth.js');

app.use(express.static(__dirname + '/../Client'));

var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

app.get('/db', function(request, response){
  pg.connect(databaseUrl, function(err, client, done){
    client.query('Select * From Users', function(err, result){
      done();
      if(err){
        throw err
      } else { 
        response.send(JSON.stringify(result.rows));
      };
    })
  })
});

app.listen(process.env.PORT || 5000)


app.post('/signup', auth.signup)
app.post('/signin', auth.signin)