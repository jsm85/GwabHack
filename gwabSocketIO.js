
exports.initialise = function(liveApp){
	var io = require('socket.io').listen(liveApp, { log: false });

	io.sockets.on('connection', function(socket){
		socket.broadcast.emit('newConnection', { connectedUsers: Object.keys(io.connected).length });

		socket.on('disconnect', function() {
	    });
	});

	console.log('Socket IO initialised.');
};
