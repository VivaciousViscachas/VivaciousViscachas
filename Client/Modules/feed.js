var feed = {}

//test data
var data = {
"results": [
{"name" : "the austin linux meetup",
"members" : 11000
},
{"name" : "the austin javascript meetup",
"members" : 1223123
}]
}

feed.model = function (item) {
	this.name = item.name;
	this.members = item.members;

};

//builds the feed list based off the database query
feed.list = function(array){
	var list = [];
	for (var i = 0; i < array.results.length; i++){
		var temp = new feed.model(array.results[i]);
		list.push(temp);
	}
	return list;
}

feed.controller = function () {
  mctrl = this;
  mctrl.listOfItems = feed.list(data);
}

feed.view = function (ctrl) {
  return m('div', [
    mctrl.listOfItems.map((function(meetup){
         return m('table', [
            m('tr', [
              m('td', meetup.name), m('td', meetup.members)
            ])
          ])
    }))
  ])
}