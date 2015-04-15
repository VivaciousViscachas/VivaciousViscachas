var jwt = require('jwt-simple'), 
    pg = require('pg'),
    bcrypt = require('bcrypt-nodejs');


module.exports= {
  signup:function(request, response){
    var firstName = request.body.firstName
    var email = request.body.email
    var password = request.body.password
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'
    var userObj = {'firstName': firstName, 'email': email, 'password':password}
    var salt = bcrypt.genSaltSync(10);

    pg.connect(databaseUrl, function(err, client, done){
      client.query('SELECT firstName FROM users WHERE email=' + email, function(err, result){ //check DB for email
        done();
        if(err){ //if doesn't exist in DB
          //add user to DB
          var hash = bcrypt.hashSync(password, salt); 
          client.query('INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3)',[firstName, email, hash], function(){ 
            var token = jwt.encode(userObj, 'secret') //create the token
            response.send({token: token}) //res.json or res.send?
          }
        } else { 
          console.log('user already exists')
        };
      })
    })
  },
  
  signin:function(request, response){
    var email = request.body.email
    var password = request.body.password
    var databaseUrl = process.env.DATABASE_URL || 'postgres://localhost/devmeet'
    var databasePassword;

    pg.connect(databaseUrl, function(err, client, done){
      client.query('')
    }



    bcrypt.compare(password, this.get('password'), function(err, same) {
      cb(same)
    });
  }
}