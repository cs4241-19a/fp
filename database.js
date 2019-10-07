const Maxmind = require('@maxmind/geoip2-node').Reader;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@faviconmap-j8xwi.mongodb.net/FaviconMap?retryWrites=true&w=majority&authSource=admin";
module.exports = function () {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    // let PingsCollection;
    client.connect().then(() => {
        client.db('FaviconMap').createCollection('pings');
    });

    // .then(() => PingsCollection = client.db('FaviconMap').collection('pings'));
    function PingsCollection() {
        return new Promise((resolve) => {
            if (client.isConnected()) resolve(client.db('FaviconMap').collection('pings'));
            else client.connect().then(() => resolve(client.db('FaviconMap').collection('pings')))
        })
    }

    function getLocation(data, cb) {
        return new Promise((resolve, reject) => {
            Maxmind.open('GeoLite2-City.mmdb').then(reader => {
                let ip = data[0].ip;
                if (!ip) reject("MaxMind lookup failed! No IP for data[0]");
                let location = reader.city(ip);
                for (let i = 0; i < data.length; i++) {
                    data[i].lat = location.location.latitude;
                    data[i].lng = location.location.longitude;
                    data[i].city = location.city.names.en;
                    data[i].country = location.country.isoCode;
                }
                resolve(data);
            }).catch(error => {
                reject("Error getting GeoIP info: " + error)
            });
        });
    }

    return {
        // Data: [{favicon: "", rtt: 0, ip: ""}]
        insertPings: function (data) {
            return new Promise((resolve) => {
                console.log("Inserting", data);
                getLocation(data).then(data => PingsCollection().then(col => resolve(col.insertMany(data))));
            });
        },
        // returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
        getData: function () {
            return new Promise((resolve, reject) => {
                PingsCollection().then(col =>
                    col.aggregate([
                        {$match: {}},
                        {
                            $group: {
                                "_id": {"favicon": "$favicon", "city": "$city"},
                                count: {$sum: 1},
                                lat: {$avg: "$lat"},
                                lng: {$avg: "$lng"},
                                avg_rtt: {$avg: "$rtt"},
                                max_rtt: {$max: "$rtt"}
                            }
                        }]).toArray((err, res) => {
                        res.forEach(d => {
                            d.favicon = d._id.favicon;
                            d.city = d._id.city
                        });
                        resolve(res);
                    })
                )
            });
        }
    };
};
