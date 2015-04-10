var express = require('express');
var app = express();

app.use(express.static(__dirname + '/Client'));

app.listen(3000)

