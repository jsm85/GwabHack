
exports.initialise = function(liveApp){
	var io = require('socket.io').listen(liveApp, { log: false });

	io.sockets.on('connection', function(socket){

		socket.on('socketIOtest', function(timeRange) {
			console.log('clicked');
		});

		socket.on('disconnect', function() {
		
	    });
	});

	console.log('Socket IO initialised.');
};
