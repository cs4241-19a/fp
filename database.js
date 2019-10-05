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

    function getCity(data, cb) {
        return new Promise((resolve, reject) => {
            Maxmind.open('GeoLite2-City.mmdb').then(reader => {
                for (let i = 0; i < data.length; i++) {
                    let city = reader.city(data[i].ip);
                    data[i].lat = city.location.latitude;
                    data[i].lng = city.location.longitude;
                    data[i].city = city.city.names.en;
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
                getCity(data).then(data => PingsCollection().then(col => resolve(col.insertMany(data))));
            });
        },
        // returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
        getData: function () {
            return new Promise((resolve, reject) => {
                PingsCollection().then(col => resolve(col.find().toArray())).catch(error => reject(error))
            });
        }
    };
};
