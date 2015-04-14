var jwt = require('jwt-simple'), 
    pg = require('pg');

module.exports= {
  signup:function(request, response){
    var firstName = request.body.firstName
    var email = request.body.email
    var password = request.body.password
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'
    var userObj = {'firstName': firstName, 'email': email, 'password':password}

    pg.connect(databaseUrl, function(err, client, done){
      client.query('SELECT firstName FROM users WHERE email=' + email, function(err, result){ //check DB for email
        done();
        if(err){ //if doesn't exist in DB
          //add user to DB
          var token = jwt.encode(userObj, 'secret') //create the token
          response.send({token: token}) //res.json or res.send?
        }
        else { 
          console.log('user already exists')
        };
      })
    })
  },
  
  signin:function(request, response){
    var email = request.body.email
    var password = request.body.password
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

  }
}