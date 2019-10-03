const DB = require('./database');
function testcb(){
    console.log("insert successful?")
}

const db = new DB(testcb);
const testdata = [
    {favicon: "facebook.com", rtt: 1.2, ip: "31.13.71.36"},
    {favicon: "google.com", rtt: 2.1, ip: "172.217.9.238"},
    {favicon: "reddit.com", rtt: 0.1, ip: "151.101.193.140"}
];
db.insertPings(testdata);

let gotData = db.getData();
console.log(gotData);
