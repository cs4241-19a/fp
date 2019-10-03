const mongoose = require('mongoose');
module.exports = function (callback) {
	mongoose.connect('mongodb://localhost:27017/FaviconMap', {useNewUrlParser: true});
	let Ping;
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log("Creating Schema!");
		module.exports.PingSchema = new mongoose.Schema({
			favicon: String,
			rtt: Number,
			ip: String
		});
	});

	return {
		Ping: mongoose.model('Ping', module.exports.PingSchema),
        // Data: [{favicon: "", rtt: 0, ip: ""}]
        insertPings: function (data) {
            let newPing = new Ping({favicon: data.favicon, rtt: data.rtt, ip: data.ip});
            newPing.save();
            callback()
        },
        // returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
        getData: function () {

            let promise = Ping.find().exec();
            // assert.ok(promise instanceof Promise);
            promise.then(function (data) {
                for (let i = 0; i < data.length; i++) console.log(data[i]);
            });

            return data;
        }
    }
};
