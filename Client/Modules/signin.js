var Signin = {}

Signin.model = function(){
 this.email =  m.prop("");
 this.password =  m.prop("");
};

Signin.controller = function(){
 var ctrl = this;
 ctrl.user = m.prop(new Signin.model());

   ctrl.signin = function(){
      return m.request({method:"POST", url:"/signin", data: ctrl.user()}).then(function(token){
         //check database for username/password (auth)
         localStorage.setItem('session', token.token)
         m.route('/')
      })
   }
};

Signin.view = function(ctrl){
 return m('fieldset', [
   m('label', "Email:"),
   m('input[type=text]', { value: ctrl.user().email(), onchange: m.withAttr('value', ctrl.user().email)}),
   m('br'),
   m('label', "Password:"),
   m('input[type=text]', { value: ctrl.user().password(), onchange: m.withAttr('value', ctrl.user().password)}),
   m('br'),
   m('a', { onclick: ctrl.signin, href:'#' }, 'Sign in!')
 ])


};