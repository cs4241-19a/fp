var AWS = require('aws-sdk');
var ses = new AWS.SES();


exports.handler = (event, context, callback) => {
 sendEmail(event, function(err, data) {
  var response = {
   "isBase64Encoded": false,
   "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
   "statusCode": 200,
   "body": JSON.stringify({"result": "success"})
  };
  callback(err, response);
 });
};

function sendEmail (payload, done) {
 var params = {
  Destination: {
   ToAddresses: ['carecomparedev@gmail.com']
  },
  Message: {
   Body: {
    Text: {
     Data: 'Name: '+payload.name+'\n\n'+'Email: '+payload.email+'\n\n'+'Message: '+'\n'+payload.message,
     Charset: 'UTF-8'
    }
   },
   Subject: {
    Data: 'Inquiry: '+payload.subject,
    Charset: 'UTF-8'
   }
  },
  Source: 'carecomparedev@gmail.com'
 };
  ses.sendEmail(params, done);
}