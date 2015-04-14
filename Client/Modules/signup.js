var Signup = {}

Signup.model = function(){
  this.firstName =  m.prop('First Name');
  this.email =  m.prop('Email');
  this.password =  m.prop('Password');
};

Signup.controller = function(){
  var ctrl = this;

  ctrl.signup = m.prop(new Signup.model());

  ctrl.add = function () {
    var newModel = new Signup.model()
    return m.request({ method:"POST", url:"/signup", data: signup() }).then(function(token){ 
      //send data to node server

      localStorage.setItem('session', token)
      m.route('/home')
    })
  }
};

Signup.view = function(ctrl){
  return m('fieldset', [
    m('label', "First name:"),
    m('input[type=text]', { value: ctrl.signup().firstName(), onchange: m.withAttr('value', ctrl.signup().firstName )}),
    m('br'),
    m('label', "Email:"),
    m('input[type=text]', { value: ctrl.signup().email(), onchange: m.withAttr('value', ctrl.signup().email )}),
    m('br'),
    m('label', "Password:"),
    m('input[type=text]', { value: ctrl.signup().password(), onchange: m.withAttr('value', ctrl.signup().password )}),
    m('br'),
    m('a', { onclick: ctrl.add, href:'#' }, 'Sign up!')
  ])
};