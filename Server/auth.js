module.exports= {
  signup:function(request, response){
      var firstName = request.body.firstName
      var email = request.body.email
      var password = request.body.password
  },
  
  signin:function(request, response){
      var email = request.body.email
      var password = request.body.password
  }
}