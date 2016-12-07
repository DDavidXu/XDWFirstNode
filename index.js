/*
by 	  : DDavidXu

autor : XDW

type  : Demo

commond : supervisor --harmony index
*/

var express = require('express');
var routes = require('./routes');




var app = express();

routes(app);

app.listen('3000', function () {
	console.log('app port is 3000');
});