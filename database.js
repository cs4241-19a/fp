const mongoose = require('mongoose');
module.exports = function (callback) {
    // mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@faviconmap-shard-00-00-j8xwi.mongodb.net:27017,faviconmap-shard-00-01-j8xwi.mongodb.net:27017,faviconmap-shard-00-02-j8xwi.mongodb.net:27017/admin?ssl=true&replicaSet=FaviconMap-shard-0&authSource=admin&retryWrites=true&w=majority",
    mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@faviconmap-j8xwi.mongodb.net/FaviconMap?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => console.log("Connection error: " + error));
    let Ping;
    let PingSchema;
    const dbConn = mongoose.connection;
    dbConn.on('error', console.error.bind(console, 'connection error:'));
    // dbConn.once('open', function () {
    console.log("Creating Schema!");
    PingSchema = new mongoose.Schema({
        favicon: String,
        rtt: Number,
        ip: String
    });
    // });
    Ping = mongoose.model('Ping', PingSchema);

    return {
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
                return data;
            });


        }
    }
};
