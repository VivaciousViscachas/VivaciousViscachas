var Signin = {}

Signin.model = function(){
 this.email =  m.prop("");
 this.password =  m.prop("");
};

Signin.controller = function(){
 var ctrl = this;
 ctrl.user = m.prop(new Signin.model());

   ctrl.signin = function(){
      return m.request({method:"POST", url:"/signin", data:ctrl.user()}).then(function(token){
         //check database for username/password (auth)
         var userObj = JSON.stringify({session: token.token, email: ctrl.user().email()})
         localStorage.setItem('session', userObj)
         m.route('/')
      })
   }
};

Signin.view = function(ctrl){
   return m('div.container',[
      m('form', [
         m('div.form-group.col-md-6.col-md-offset-3',[ 
            m('label', "Email:"),
            m('input[type=text].form-control', { value: ctrl.user().email(), onchange: m.withAttr('value', ctrl.user().email)})
         ]),
         m('div.form-group.col-md-6.col-md-offset-3',[ 
            m('label', "Password:"),
            m('input[type=password].form-control', { value: ctrl.user().password(), onchange: m.withAttr('value', ctrl.user().password)}), 
            m('br'),
            m('a[href=#].btn.btn-default', { onclick: ctrl.signin }, 'Sign in!')
         ])
      ]),

      m('div.col-md-6.col-md-offset-3',[
         m('span', 'Not a member yet?  '),
         m('a[href=#/signup]','Sign Up!')
      ])
   ])
};



