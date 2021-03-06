var Session = {}

Session.isLoggedIn = function(){
  if (localStorage.getItem('session')){
    return true;
  }else{
    return false;
  }
}

Session.logUserOut = function(){
  localStorage.removeItem('session')
}


Session.logUserIn = function (user) {
  return m.request({method:"POST", url:"/signin", data: user}).then(function(token){
     var userObj = JSON.stringify({session: token.token, email: user.email()})
     localStorage.setItem('session', userObj)
  })
}

Session.signUserUp = function(user){
  return m.request({ method:"POST", url:"/signup", data: user}).then(function(token){ 
    var sessionObj = JSON.stringify({session: token.token, email: user.email()})
    localStorage.setItem('session', sessionObj) //storing a session token and the email
    Session.isLoggedIn = true
  })
}
