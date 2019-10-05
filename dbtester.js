const DB = require('./database');

const db = new DB();
const testdata = [
    {favicon: "facebook.com", rtt: 1.2, ip: "72.93.244.26"},
];
db.insertPings(testdata).then(result => console.log(result));

db.getData().then(data => console.log(data));

