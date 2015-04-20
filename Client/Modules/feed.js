var feed = {}


feed.model = function (item) {
  this.id = item.id;
  this.event_name = item.event_name;
  this.starred = false;
};

feed.controller = function () {
  mctrl = this;
  mctrl.listOfItems = function(obj){
      var list = obj;
      return list;
  }
  //gets the meetups from the DB and then stores them in localStorage
  mctrl.getMeetups = function () {
   return m.request({method:"GET", url:"/feed"}).then(function(result){
    localStorage.setItem('meetups', JSON.stringify(result))
   })
  }
  mctrl.star = function (meetup) {
    console.log(meetup)
    mctrl.listOfMeetups[meetup.id-1].starred = true;
    var email = JSON.parse(localStorage.getItem('session')).email
    console.log(email)
    var test = {meetup: meetup, email:email};
    return m.request({method:"POST", url:"/star", data:test}).then(function(result){
      console.log(JSON.parse(JSON.stringify(result)))
    })
  }
  mctrl.getMeetups();
  mctrl.listOfMeetups = mctrl.listOfItems(JSON.parse(localStorage.getItem('meetups')))
}

feed.view = function (ctrl) {
  return m('div.feed', [
    mctrl.listOfMeetups.map((function(meetup){
      return m('ul', [
        m('li', [
          m('h3', meetup.event_name), m('button.starred', {onclick: function(){ mctrl.star(meetup)}})
        ])
      ])
    }))
  ])
}
