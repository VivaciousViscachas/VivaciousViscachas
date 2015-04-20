var Logout = {}

Logout.view = function(){
  if (Session.isLoggedIn) {
    return m('a[href=#/signin].logout',{onclick: Session.logUserOut}, 'Logout')
  }
}