var Signin = {}

Signin.model = function(){
 this.email =  m.prop("");
 this.password =  m.prop("");
};

Signin.controller = function(){
 var ctrl = this;
 ctrl.user = m.prop(new Signin.model());

   ctrl.signin = function(){
      return m.request({method:"POST", url:"/#/signin", data: ctrl.user()}).then(function(token){
         //check database for username/password (auth)
         localStorage.setItem('session', token.token)
         // console.log(localStorage.getItem('session'))
         // console.log('inside signin')
         m.route('/')
      })
   }
};

Signin.view = function(ctrl){
 return m('form', [
   m('div.form-group',[ 
      m('label', "Email:"),
      m('input[type=text]', { value: ctrl.user().email(), onchange: m.withAttr('value', ctrl.user().email)})
   ]),
   m('div.form-group'[ 
      m('label', "Password:"),
      m('input[type=password]', { value: ctrl.user().password(), onchange: m.withAttr('value', ctrl.user().password)})  
   ]),
   m('a', { onclick: ctrl.signin, href:'#' }, 'Sign in!'),
   m('p', 'Not a member yet?'),
   m('a[href=#/signup]','Sign Up!')
 ])
};