var profile = {}

profile.model = function(userObj){
  this.firstName = userObj.firstName
  this.savedMeetups = userObj.meetups //or whatever it's stored in obj as
};

profile.controller = function(){
  var ctrl = this;
  ctrl.meetupList;
  ctrl.email = JSON.parse(localStorage.getItem('session'));
  // console.log(ctrl.email)

  ctrl.getMeetups = function () {
    return m.request({method:"POST", url:"/mymeetups", data: ctrl.email}).then(function(result){
      // localStorage.setItem('meetups', JSON.stringify(result))
      ctrl.meetupList = result;
    })
  }

  ctrl.getMeetups();
};

profile.view = function(ctrl){
  var meetupList = ctrl.meetupList;

  return m('h2', "Hello!" ), // access / show the users first name.

  m('div.queue', [ //div witht the class '.queue'
    m("ul", [
        m("li", meetupList.map(function(meetup){
          return 'hi'//
          //map the users saved meetups 
            //goal: set up list items by time 
        })) 
    ]) 
  ], 'My Meetups')
};


//GOAL: add a dequeue button for users to remove meetups they no longer want to go to
