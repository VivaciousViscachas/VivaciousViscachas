var jwt = require('jwt-simple'), 
    pg = require('pg'),
    bcrypt = require('bcrypt-nodejs'),
    databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet',
    db = require('knex')({
      client: 'pg',
      connection:databaseUrl
    })


module.exports= {
  signup:function(request, response){
    //separating the request data
    var firstName = request.body.firstName,
      email = request.body.email,
      password = request.body.password,
      databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet',
      userObj = {'firstName': firstName, 'email': email, 'password':password},
      salt = bcrypt.genSaltSync(10); 

      db.select("first_name") //
      .from('users')
      .where('email', email)
      .then(function(result){
        console.log(result)
        if (result.length === 0){ //if user not found in database
          var hash = bcrypt.hashSync(password, salt); 
          db('users').insert({ //insert the user and their info
            first_name: firstName,
            email: email,
            password: hash
          })
          .then(function(result){
            var token = jwt.encode(userObj, 'secret'); //then issue a token
            console.log('token',token)
            response.send({token: token, email: email})  //send user token
          })
        } else {
          console.log('user already exists')
        }
      })

    // pg.connect(databaseUrl, function(err, client, done){
    //   client.query('SELECT first_name FROM users WHERE email=' + email, function(err, result){ //check DB for email
    //     done();
    //     if(err){ //if doesn't exist in DB add user to DB
    //       var hash = bcrypt.hashSync(password, salt); 
    //       client.query('INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3)',[firstName, email, hash], function(){ 
    //         // localStorage.setItem('email', email)
    //         var token = jwt.encode(userObj, 'secret');
    //         console.log('token',token)
    //         response.send({token: token, email: email})  //send user token
    //       })
    //     } else { 
    //       console.log('user already exists')
    //     }
    //   })
    // })
  },
  
  signin:function(request, response){
    var email = request.body.email
    var password = request.body.password
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

    pg.connect(databaseUrl, function(err, client, done){
      client.query('SELECT password FROM users WHERE email=' + email, function(err, result){
        done();
        if (err) console.log ('user does not exist')
        else {
          bcrypt.compare(password, result, function(err, same) {
            if (same){
              var token = jwt.encode(userObj, 'secret') 
              response.send({token: token, email:email}) 
            }
          });
        }
      })
    })
  },

  profile: function(request, response){
    var email = request.body;
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

    if (email){ 
      pg.connect(databaseUrl, function(err, client, done){
        client.query('SELECT (meetups.event_name, meetups.event_time, meetups.event_description, meetups.event_duration, meetups.venue_address) FROM starred JOIN meetups ON (starred.meetup_id = meetups.id) JOIN users ON (users.id = starred.user_id) WHERE users.email=' + email, function(err, result){
            //query database users table using email to access user_id
            //JOIN starred table using user_id to access meetup_id
            //JOIN meetups table with meetup_id's to access meetups (array of objects)
          done();
          if (err) console.log('error in profile in auth.js')
          else {
            response.send(result) //return array of objects to the profile page 
          }
        })
      })
    }
  }
}









