const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@faviconmap-j8xwi.mongodb.net/FaviconMap?retryWrites=true&w=majority&authSource=admin";
module.exports = function (callback) {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    client.connect().then(() => {
        client.db('FaviconMap').createCollection('pings')
    });

    return {
        // Data: [{favicon: "", rtt: 0, ip: ""}]
        insertPings: function (data) {
            client.connect(function (err, db) {
                db.db('FaviconMap').collection('pings').insertMany(data).then(() => {
                    callback();
                });
            });
        },
        // returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
        getData: function (cb) {
            client.connect(function (err, db) {
                db.db('FaviconMap').collection('pings').aggregate(
                    { $match: { } },
                    { $group: { "_id": { "favicon": "favicon", "city": "city"},
                            count: { $sum: 1 },
                            avg_rtt: { $avg: "$rtt"},
                            max_rtt: { $max: "rtt" } } }).toArray((err, res) => {
                                cb(err, res);
                            });
            });
        }
    };
};
