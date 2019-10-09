const MaxMind = require('@maxmind/geoip2-node').Reader;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@faviconmap-j8xwi.mongodb.net/FaviconMap?retryWrites=true&w=majority&authSource=admin";
module.exports = function () {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    function DB() {
        return new Promise(resolve => {
            if (client.isConnected()) resolve(client.db('FaviconMap'));
            else client.connect().then(() => resolve(client.db('FaviconMap')));
        })
    }

    DB().then(db => db.collection('pings'));

    function PingsCollection() {
        return new Promise((resolve) => DB().then(db => resolve(db.collection('pings'))))
    }

    function reverseGeocode(lat, lon) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                console.log('readyStatechange:  ' + request.readyState);
            };
            request.onload = () => {
                // console.log("Reverse Geo: ", request.responseText);
                if (request.status >= 200 && request.status < 400) {
                    let data = JSON.parse(request.responseText);
                    if(data['QueryStatusCode'] !== 'Success') reject("Reverse Geocode lookup failed: " + data['ErrorMessage']);
                    let address = data['streetAddresses'][0];
                    resolve({
                        city: address['City'],
                        state: address['State'],
                        country: 'US'
                    })
                } else reject("Reverse Geocode lookup failed with API status code " + request.status + ": " + request.responseText);
            };

            let parameters = {
                apiKey: 'efda2ed783e748239c3406235a586f43',
                version: 4.1,
                lat: lat,
                lon: lon,
                notStore: true,
                format: 'json',
            };
            let url = 'https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/Rest/?' +
                'apiKey=efda2ed783e748239c3406235a586f43&' +
                'version=4.1&' +
                'lat=' + lat + '&' +
                'lon=' + lon + '&' +
                'notStore=true&' +
                'format=json';
            request.open('GET', url, true);
            request.responseType = 'json';
            request.send(JSON.stringify(parameters))
        })
    }

    function maxMindLookup(ip) {
        return new Promise((resolve, reject) => {
            MaxMind.open('GeoLite2-City.mmdb').then(reader => {
                let data = reader.city(ip);
                if (!ip) reject("MaxMind lookup failed! No IP for data[0]");
                resolve({
                    lat: data.location.latitude,
                    lon: data.location.longitude,
                    city: data.city.names.en,
                    state: data.subdivisions[0].isoCode,
                    country: data.country.isoCode
                });
            }).catch(error => reject("MaxMind lookup failed! " + error))
        })
    }

    function getLocation(data) {
        return new Promise((resolve, reject) => {
            let type = data.connectionInfo.type;
            if ((data.isMobile && type === 'wifi') || !data.isMobile)
                maxMindLookup(data.ip).then(location => resolve(location));
            else if (data.isMobile && type === 'cellular' && data.lat && data.lng)
                reverseGeocode(data.lat, data.lng).then(location => resolve(location));
        });
    }

    return {
        locationLookup: function (data) {
            return new Promise(resolve => resolve(getLocation(data[0])))
        },
        // Data: [{ favicon: 'Yahoo',
        //     rtt: 657,
        //     lat: '42.28',
        //     lng: '-71.80',
        //     connectionInfo: { effectiveType: '4g', rtt: 50, downlink: 5.2, type: 'wifi', downlinkMax '6.66'},
        //     ip: '::1',
        //     isMobile: false }]
        insertPings: function (data) {
            return new Promise((resolve, reject) => {
                getLocation(data[0]).then(location => {
                    for (let i = 0; i < data.length; i++) {
                        data[i].lat = location.lat;
                        data[i].lng = location.lng;
                        data[i].city = location.city;
                        data[i].state = location.state;
                        data[i].country = location.country;
                    }
                    PingsCollection().then(col => resolve(col.insertMany(data)));
                }).catch(error => reject("Error getting GeoIP info: " + error));
            });
        },
        // returns [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
        getData: function () {
            return new Promise(resolve => PingsCollection().then(col =>
                col.aggregate([
                    {$match: {country: "US"}}, {
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
                        d.city = d._id.city;
                    });
                    resolve(res);
                })
            ));
        }
    };
};
