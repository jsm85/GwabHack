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

if(process.env.MARVEL_API_PUBLIC === undefined)
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
	{Id:1009351, Row:1, Column:1}, //Hulk
	{Id:1009220, Row:1, Column:2}, //Captain America
	{Id:1009368, Row:1, Column:3}, //Iron Man
	{Id:1009664, Row:1, Column:4}, //Thor
	{Id:1009189, Row:2, Column:1}, //Black Widow
	{Id:1009471, Row:2, Column:2}, //Nick Fury
	{Id:1009338, Row:2, Column:3},  //Hawkeye
	{Id:1009407, Row:2, Column:4}  //Loki
]

app.get('/', function(req, res, next){

	var avengers = cache.get('avengers');
	var bag = [];

	if(avengers == null)
	{

	    var marvel = new Marvel({
	    	publicKey: publicKey, 
	    	privateKey: privateKey
	    });

    	async.eachSeries(avengersList, function(item, callback){
    		
			marvel.getCharactersById(item.Id, function(err, resp) {
				var character = 
			    { 
			    	DataRow: item.Row,
			    	DataColumn: item.Column,
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