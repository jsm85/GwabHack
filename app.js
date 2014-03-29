var express = require('express'),
	socketIO = require('./gwabSocketIO'),
	Marvel = require('marvel');

var app = express();
app.use(express.json());
app.use(app.router);

app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res, next){

    var marvel = new Marvel({ publicKey: process.env.MARVEL_API_PUBLIC, 
    	privateKey: process.env.MARVEL_API_PRIVATE });

	marvel.getCharactersById(1009351 , function(err, resp) {
	    res.render('Index', { PageName: 'GwabHack', HulkDescription: resp.data.results[0].description,
	    HulkImage: resp.data.results[0].thumbnail.path + '/portrait_xlarge.' + resp.data.results[0].thumbnail.extension});
	});
});

var server = app.listen(process.env.port || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

socketIO.initialise(server);