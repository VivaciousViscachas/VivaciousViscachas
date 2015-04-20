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
            response.send({token: token})  //send user token
          })
        } else {
          console.log('user already exists')
        }
      })
  },
  
  signin:function(request, response){
    var email = request.body.email,
      password = request.body.password,
      userObj = {'email': email, 'password':password},
      databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

    db.select('password')
    .from('users')
    .where('email',email)
    .then(function(result){
      if (result.length > 0) {
        var result = result[0].password;

        bcrypt.compare(password, result, function(err, same) {
          if (same){
            console.log("token sending!")
            var token = jwt.encode(userObj, 'secret') 
            response.send({token: token}) 
          }
        })
      } else {
        console.log('error with signin')
      }
    })
  },

  starred: function(request, response){
    var email = request.body.email;
    console.log(email)
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'

    if (email){ 
      db.select('meetups.event_name', 'meetups.event_time', 'meetups.event_description', 'meetups.event_duration', 'meetups.venue_address')
      .from('meetups')
      .innerJoin('starred',"starred.meetup_id", "meetups.id")
      .innerJoin('users', 'users.id', 'starred.user_id')
      .where('users.email',email)
      .then(function(result){
        console.log('result in starred auth',result)
        response.send(result) //send back starred data
      })
      //Above: 
      //query database users table using email to access user_id
      //JOIN starred table using user_id to access meetup_id
      //JOIN meetups table with meetup_id's to access meetups (array of objects)

    } else {
      console.log('error in starred auth.js')
    }
  },
  star: function(request, response){
    var meetup = {data: request.body.meetup};
    var email = {data: request.body.email};
    var db = require('knex')({
      client: 'pg',
      connection: databaseUrl
    })

      var token = {
        email: email.data
      };

      var feed = {
        m_id: meetup.id
      };

      db.select('id')
        .from('users')
        .where('email', token.email)

      .then(function(result){
        var u_id = result[0].id

        db.select('meetup_id', 'user_id')
          .from('starred')
          .where('meetup_id', feed.m_id)
          .andWhere('user_id', u_id)

        .then(function(result){
          if (result.length === 0) {
            db('starred')  
              .insert({
                meetup_id: feed.m_id,
                user_id: u_id
              })
            .then(function(){
              console.log('inserted')
            })
          }
        })
      })
      response.end(JSON.stringify(meetup))   
  }
}









