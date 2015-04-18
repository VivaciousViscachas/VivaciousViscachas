var starred = {}

starred.model = function(userObj){
  this.firstName = userObj.firstName
  this.savedMeetups = userObj.meetups 
};

starred.controller = function(){
  ctrl = this;
  ctrl.meetupList; 
  var email = {email: JSON.parse(localStorage.getItem('session')).email};

  ctrl.getMeetups = function () {
    return m.request({method:"POST", url:"/mymeetups", data: email}).then(function(result){
      console.log('inside getMeetups!')
      ctrl.meetupList = result;
      console.log('result',result)
    })
  }

  ctrl.getMeetups();
};

starred.view = function(ctrl){
  var meetupList = ctrl.meetupList;

  return m('div.allStarred', [
    m('h4.mymeetups', 'My Meetups '),
    m('div.queue', [ //div witht the class '.queue'
      m("ul", [
        m("p", meetupList.map(function(meetup){
          return m('div.event', [
            m('p.eventName', meetup.event_name),
            m('p', " Location: "+meetup.venue_address),
            m('p', " Start Time: "+meetup.event_time),
            m('p', " Duration: "+meetup.event_duration)
            // m('p', " Description: "+meetup.event_description)
          ])
            //goal: set up list items by time 
          ])
        })) 
      ]) 
    ])
  ])
};


//GOAL: add a dequeue button for users to remove meetups they no longer want to go to


