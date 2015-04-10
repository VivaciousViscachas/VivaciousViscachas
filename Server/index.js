var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../Client'));

app.listen(process.env.PORT || 5000)


// app.post('/signup', )
// app.post('/signin', )