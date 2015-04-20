var feed = {}


feed.model = function (item) {
  this.id = item.id;
  this.event_name = item.event_name;
  this.starred = false;
};

feed.controller = function () {
  mctrl = this;

  if (Session.isLoggedIn === false){

  }

  mctrl.listOfItems = function(obj){
      var list = obj;
      return list;
  }

  mctrl.getMeetups = function () {
   return m.request({method:"GET", url:"/meetups"}).then(function(result){
    localStorage.setItem('meetups', JSON.stringify(result))
   })
  }

  mctrl.star = function (meetup) {
    console.log(meetup)
    mctrl.listOfMeetups[meetup.id-1].starred = true;
    var test = {test: meetup};
    return m.request({method:"POST", url:"/star", data:test}).then(function(result){
      console.log(JSON.parse(JSON.stringify(result)))
    })
  }
  mctrl.getMeetups();
  mctrl.listOfMeetups = mctrl.listOfItems(JSON.parse(localStorage.getItem('meetups')))
}

feed.view = function (ctrl) {
  return m('div.allStarred', [
    mctrl.listOfMeetups.map((function(meetup){
      return m('ul', [
        m('p', [
          m('p.eventName', meetup.event_name),
          m('p', " Location: "+meetup.venue_address),
          m('p', " Start Time: "+meetup.event_time),
          m('p', " Duration: "+meetup.event_duration),
          m('button', {class: 'unstarred'}, {onclick: function(){ console.log('hi')}})
        ])
      ])
    }))
  ])
}
