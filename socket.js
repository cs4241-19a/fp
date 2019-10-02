// app/routes.js
module.exports = function (io) {
	let userCount = 0;

	const update = function() {
		// Do stuff
	};

	const db = require('./database')(update);

	const updateUserCount = function() {
		io.emit('sendUserCount', userCount); // Emits to everyone
	};

	const getUserCount = function(socket) {
		socket.emit('sendUserCount', userCount); // Emits to just the requester
	};

	io.on('connection', function (socket) {
		userCount++;
		updateUserCount();

		socket.on('disconnect', function () {
			userCount--;
			updateUserCount();
		});

		socket.on('getUserCount', () => getUserCount(socket));
	});
};
