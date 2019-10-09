const mobile_detect = require('mobile-detect');

module.exports = function (io) {
	let userCount = 0;

	const update = function() {
		// io.emit('sendData', falseData);
		db.getData().then((data) => io.emit('sendData', data));
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
			const clientIpAddress = (socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress).split(", ")[0];
			socket.emit('sendConnectionInfo', clientIpAddress);
		});

		socket.on('submitNewData', data => {
			const clientIpAddress = (socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress).split(", ")[0];
			const user_agent = socket.request.headers["user-agent"];
			const md = new mobile_detect(user_agent);
			data.forEach(d => {d.ip = clientIpAddress; d.isMobile = !(md.mobile() === undefined || md.mobile() === null)});

			db.insertPings(data).then(update);
		});

		socket.on('getData', () => db.getData().then(data => socket.emit('sendData', data)));

		socket.on('superSecretDelete', db.deleteAll);
	});
};
