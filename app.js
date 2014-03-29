var express = require('express'),
	socketIO = require('./gwabSocketIO');

var app = express();
app.use(express.json());
app.use(app.router);

app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res, next){
	res.render('Index', { PageName: 'GWAB Hack' });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

socketIO.initialise(server);