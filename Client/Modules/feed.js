feed = {}

feed.model = function (item) {
	// need to know what info I get from the meetup api first
	this.name = m.prop(item.name);
	this.owner = m.prop(item.owner);

};

//builds the feed array based off the database query
feed.list = function(data){
	var list = [];
	for (var i = 0; i < data.results.length; i++){
		var temp = new feed.model(data[i]);
		list.push();
	}
	return list;
}

feed.controller = function () {
  var ctrl = this
  ctrl.feed = 
}

feed.view = function (ctrl) {

  return m('.feed', [
    m('h3', 'Please enter your contact information:'),
    ctrl.feed().map(function (contact, idx) {
      return m('fieldset', [
        m('legend', "Attendee #" + (idx+1)),
        m('label', "Name:"),
        m('input[type=text]', { value: contact.name(), onchange: m.withAttr('value', contact.name) }),
        m('br'),
        m('label', "Email:"),
        m('input[type=text]', { value: contact.email(), onchange: m.withAttr('value', contact.email) }),
      ])
    }),
  ])
}

var links = [
    {title: "item 1", url: "/item1"},
    {title: "item 2", url: "/item2"},
    {title: "item 3", url: "/item3"}
];

m.render(document.body, [
    m("ul.nav", [
        m("li", data.results.map(function(meetup) {
            return m("a", meetup.name, meetup.owner)
        }))
    ])
]);


var data = {
"results": [
{
"utc_offset": -18000000,
"country": "US",
"visibility": "public",
"city": "Austin",
"timezone": "US/Central",
"created": 1035957311000,
"topics": [
{
"urlkey": "linux",
"name": "Linux",
"id": 188
},
{
"urlkey": "apache",
"name": "Apache",
"id": 190
},
{
"urlkey": "php",
"name": "PHP",
"id": 455
},
{
"urlkey": "mysql",
"name": "MySQL",
"id": 789
},
{
"urlkey": "programming",
"name": "Programming",
"id": 17627
},
{
"urlkey": "devops",
"name": "DevOps",
"id": 87614
},
{
"urlkey": "systems-administration",
"name": "Systems Administration",
"id": 94779
}
],
"link": "http://www.meetup.com/linux-85/",
"rating": 4.54,
"description": "<p>Come learn about and discuss the vast and vibrant Linux ecosystem. A different topic every month.</p>
<p><a href="https://docs.google.com/spreadsheets/d/1fVIio6mOpzkaL5GHGfbAbplTXn-1Qzs6fGaeYCjBjJc">Upcoming Speakers</a></p>
<p><a href="https://docs.google.com/spreadsheets/d/1fVIio6mOpzkaL5GHGfbAbplTXn-1Qzs6fGaeYCjBjJc"></a></p>
<p>Got a topic you'd like to present, or one you'd like to hear about? Contact the meetup organizer!</p>
<p>Also join us on Freenode IRC, #linuxaustin</p>",
"lon": -97.73999786376953,
"group_photo": {
"highres_link": "http://photos1.meetupstatic.com/photos/event/b/5/3/b/highres_432106395.jpeg",
"photo_id": 432106395,
"photo_link": "http://photos1.meetupstatic.com/photos/event/b/5/3/b/600_432106395.jpeg",
"thumb_link": "http://photos1.meetupstatic.com/photos/event/b/5/3/b/thumb_432106395.jpeg"
},
"join_mode": "open",
"organizer": {
"member_id": 91534162,
"name": "Matthew Wedgwood"
},
"members": 1135,
"name": "The Austin Linux Meetup",
"id": 95697,
"state": "TX",
"urlname": "linux-85",
"category": {
"name": "tech",
"id": 34,
"shortname": "tech"
},
"lat": 30.270000457763672,
"who": "Linux Enthusiasts"
}]


//show / hide public vs private feed with authentication