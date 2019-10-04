// app/routes.js
module.exports = function (io) {
	let userCount = 0;

	const update = function() {
		db.getData((err, res) => io.emit('sendData', res));
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
			const clientIpAddress = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
			data.forEach(d => d.ip = clientIpAddress);

			db.insertPings(clientIpAddress);
		});

		socket.on('getData', () => db.getData((err, res) => socket.emit('sendData', res)));
	});
};
