var request = require('request');

//var options = {
//  method: 'GET'
//  url: 'https://api.meetup.com',
//  path: '/2/open_events'
//}

request('https://api.meetup.com/2/open_events?&category=34&zip=78701&radius=20&page=1&key='+process.env.MEETUP_KEY, function (error, response, body){
  if (error) {
    console.error('error:', error)
  }
  console.log('json:', body);
});
