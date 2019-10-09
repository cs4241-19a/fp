const DB = require('./database');

const db = new DB();

const testdata = [{
    favicon: 'facebook.com',
    rtt: 1.2,
    latitude: '42.28',
    longitude: '-71.80',
    connectionInfo: {effectiveType: '4g', rtt: 50, downlink: 5.2, type: 'cellular', downlinkMax: '6.66'},
    ip: '72.93.244.26',
    isMobile: true
}];
// db.insertPings(testdata).then(result => console.log(result));

// db.getData().then(data => console.log(data));
db.locationLookup(testdata).then(data => {
        console.log(data);
        process.exit();
    }
);

