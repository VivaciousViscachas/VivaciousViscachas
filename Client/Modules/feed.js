var feed = {}


feed.model = function (item) {
	this.name = item.name;
	this.members = item.members;

};

//builds the feed list based off the database query
feed.list = function(obj){
	var list = obj;
	// for (var i = 0; i < obj.length; i++){
	// 	var temp = new feed.model(obj[i]);
	// 	list.push(temp);
	// }
	return list;
}

feed.controller = function () {
  mctrl = this;
  mctrl.listOfItems = feed.list;
  //gets the meetups from the DB and then stores them in localStorage
  mctrl.getMeetups = function () {
   return m.request({method:"GET", url:"/feed"}).then(function(result){
    localStorage.setItem('meetups', JSON.stringify(result))
   })
  }
  mctrl.getMeetups();
}

feed.view = function (ctrl) {
  return m('div', [
    mctrl.listOfItems(JSON.parse(localStorage.getItem('meetups'))).map((function(meetup){
         return m('ul', [
            m('li', [
              m('div', meetup.name), m('div', meetup.members)
            ])
          ])
    }))
  ])
}