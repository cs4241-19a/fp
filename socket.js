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

		socket.on('getConnectionInfo', () => {
			const clientIpAddress = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
			socket.emit('sendConnectionInfo', clientIpAddress);
		});

		socket.on('submitNewData', data => {
			console.log(data);
		});
	});
};
