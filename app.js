var express = require('express'),
	socketIO = require('./gwabSocketIO'),
	Marvel = require('marvel'),
	cache = require('memory-cache'),
	async = require('async');

var app = express();
app.use(express.json());
app.use(app.router);
app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var publicKey = "";
var privateKey = "";

if(process.env.MARVEL_API_PUBLIC == undefined)
{
	var secrets = require('./secrets.json');
	publicKey = secrets.publicKey;
	privateKey = secrets.privateKey;	
}
else
{
	publicKey = process.env.MARVEL_API_PUBLIC;
	privateKey = process.env.MARVEL_API_PRIVATE;
}

var avengersList = 
[
1009351, //Hulk
1009220, //Captain America
1009368, //Iron Man
1009664, //Thor
1009189, //Black Widow
1009471, //Nick Fury
1009338  //Hawkeye
]

app.get('/', function(req, res, next){

	var avengers = cache.get('avengers');
	var bag = [];

	if(avengers == null)
	{

	    var marvel = new Marvel({
	    	publicKey: publicKey, 
	    	privateKey:privateKey
	    });

    	async.eachSeries(avengersList, function(item, callback){    	
			marvel.getCharactersById(item , function(err, resp) {
			    var character = 
			    { 
			    	CharacterName: resp.data.results[0].name,
			    	ChatacterDescription: resp.data.results[0].description,
			    	CharacterImage: resp.data.results[0].thumbnail.path + '/portrait_xlarge.' + resp.data.results[0].thumbnail.extension,
			    	CharacterComics: resp.data.results[0].comics.available,
			    	CharacterStories: resp.data.results[0].stories.available,
			    	CharacterSeries: resp.data.results[0].series.available,
			    	CharacterEvents: resp.data.results[0].events.available
			    };
				bag.push(character);
				callback();
			});
		}, 
		function done(){
			console.log(bag);
			cache.put('avengers', {Characters: bag}, 90000);
			res.render('Index', cache.get('avengers'));
		});
	}
	else	{
	res.render('Index', avengers);
	}
});

var server = app.listen(process.env.port || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

//socketIO.initialise(server);