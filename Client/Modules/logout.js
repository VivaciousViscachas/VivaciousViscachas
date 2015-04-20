var Logout = {}

Logout.view = function(){
  if (Session.isLoggedIn) {
    return m('div',[
      m('a[href=#/signin].logout',{onclick: Session.logUserOut}, 'Logout'),
      m('a[href=#/mymeetups].logout', 'My Meetups')
    ])
  }
}