var profile = {}

profile.model = function(){
  this.firstName = //
  this.savedMeetups = //
};

profile.controller = function(){
  var ctrl = this;
};

profile.view = function(ctrl){

  return m('h3', "Hello" + ), // access / show the users first name.
  m('div.queue', [ //div witht the class '.queue'
    m("ul", [
        m("li", SOMETHING.map(function(meetup){
          return //
          //map the users saved meetups 
            //goal: set up list items by time 
        }) 
    ]) 
  ], 'My Meetups')

};

