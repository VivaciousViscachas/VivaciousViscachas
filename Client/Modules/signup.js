var Signup = {}

Signup.model = function(){
  this.firstName =  m.prop('');
  this.email =  m.prop('');
  this.password =  m.prop('');
};

Signup.controller = function(){
  var ctrl = this;

  ctrl.signup = m.prop(new Signup.model());

  ctrl.add = function () {
    return m.request({ method:"POST", url:"/#/signup", data: signup() }).then(function(token){ 
      //send data to node server
      // console.log('inside signup')
      localStorage.setItem('session', token)
      m.route('/')
    })
  }
};

Signup.view = function(ctrl){
  return m('form', [
    m('div.form-group',[
      m('label', "First name:"),
      m('input[type=text]', { value: ctrl.signup().firstName(), onchange: m.withAttr('value', ctrl.signup().firstName )})
    ]),
    m('div.form-group',[
      m('label', "Email:"),
      m('input[type=text]', { value: ctrl.signup().email(), onchange: m.withAttr('value', ctrl.signup().email )})
    ]),
    m('div.form-group',[
      m('label', "Password:"),
      m('input[type=password]', { value: ctrl.signup().password(), onchange: m.withAttr('value', ctrl.signup().password )})
    ]),
    m('a', { onclick: ctrl.add, href:'#' }, 'Sign up!'),
    m('p', 'Already a member?'),
    m('a[href=#/signin]','Sign In!')
  ])
};