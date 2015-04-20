var Signup = {}

Signup.model = function(){
  this.firstName =  m.prop("");
  this.email =  m.prop("");
  this.password =  m.prop("");
};

Signup.controller = function(){
  var ctrl = this;
  ctrl.signup = m.prop(new Signup.model());

  ctrl.add = function () {
    Session.signUserUp(ctrl.signup()).then(function(){
      m.route('/') 
    })
  }
};

Signup.view = function(ctrl){
  return m('div', [
    m('form', [
      m('div.form-group.col-md-6.col-md-offset-3',[
        m('label', "First name:"),
        m('input[type=text].form-control', { value: ctrl.signup().firstName(), onchange: m.withAttr('value', ctrl.signup().firstName )})
      ]),
      m('div.form-group.col-md-6.col-md-offset-3',[
        m('label', "Email:"),
        m('input[type=text].form-control', { value: ctrl.signup().email(), onchange: m.withAttr('value', ctrl.signup().email )})
      ]),
      m('div.form-group.col-md-6.col-md-offset-3',  [
        m('label', "Password:"),
        m('input[type=password].form-control', { value: ctrl.signup().password(), onchange: m.withAttr('value', ctrl.signup().password )}),
        m('br'),
        m('a[href=#].btn.btn-default', { onclick: ctrl.add }, 'Sign up!')
      ])
    ]),

    m('div.col-md-6.col-md-offset-3',[
      m('span.memberCheck', 'Already a member?  '),
      m('a[href=#/signin].link','Sign In!') 
    ])
  ])
};



