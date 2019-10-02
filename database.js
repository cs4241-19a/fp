module.exports = function(callback) {
	// Init stuff...

	return {
		// Data: [{favicon: "", rtt: 0, ip: ""}]
		insertPings: function(data) {
			// Do stuff

			callback()
		},
		// returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
		getData: function() {
			return [{favicon: "facebook.com", avg_rtt: 42, city: "Boston", lat: 42.358, lng: -71.063}];
		}
	}
};
