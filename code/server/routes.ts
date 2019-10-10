import * as express from 'express';
import * as request from 'request';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import * as path from 'path'

var multer  = require('multer')
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'dist/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).any();


import UserCtrl from './controllers/user';
import PactCtrl from './controllers/pact';
import User from './models/user';

export default function setRoutes(app) {

    const router = express.Router();

    const userCtrl = new UserCtrl();
    const pactCtrl = new PactCtrl();

    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);

    // Logs
    router.route('/user/:id/log').post(userCtrl.addLog);
    router.route('/user/:id/log').put(userCtrl.editLog);
    router.route('/user/:id/log/:logid').delete(userCtrl.deleteLog);

    // File

    //router.route('/user/:id/file').post(userCtrl.addFile, upload.single('avatar'));
    router.post('/user/:id/file', upload, function(req, res, next) {
        // @ts-ignore
        console.log(req.files[0], 'files');

        let bucket = admin.storage().bucket();
        // @ts-ignore
        bucket.upload( req.files[0].path, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
        }).then(()=>{
            // @ts-ignore
            return res.status(201).json({url:"https://firebasestorage.googleapis.com/v0/b/six-pact.appspot.com/o/" + req.files[0].filename + "?alt=media"});
        })
    });

    // Pacts
    router.route('/user/:id/pacts/join').post(userCtrl.joinPact);
    router.route('/user/:id/pacts/:pactid/leave').post(userCtrl.leavePact);
    router.route('/user/:id/pacts').get(userCtrl.getPacts);

    router.route('/pact/:id').get(pactCtrl.getPact);
    router.route('/pact/create').post(pactCtrl.createPact);
    router.route('/pact/:id').put(pactCtrl.update);

    router.route('/pact/:id/board/exercise').post(pactCtrl.postExercise);
    router.route('/pact/:id/board/recipe').post(pactCtrl.postRecipe);
    router.route('/pact/:id/board/exercise/:postid').delete(pactCtrl.deleteExercise);
    router.route('/pact/:id/board/recipe/:postid').delete(pactCtrl.deleteRecipe);


    // fitbit
    router.route('/fitbit').get(function(req, res) {
        console.log('Woooo!');
        console.log(req.query.code);
        console.log(req.query.state);

        // TODO: Set as env variable and encode!
        let clientId = '22B58W';
        let clientSecret = '5b83ba031699b973a9883dcdd6698687';

        var options = {
            uri: 'https://api.fitbit.com/oauth2/token',
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'clientId=22B58W&grant_type=authorization_code&redirect_uri=http%3A%2F%2F127.0.0.1%3A4200%2Fapi%2Ffitbit&code=' + req.query.code,
        };

        request(options, function(err, result, body) {
            if (err) {
                console.dir(err);
                return;
            }
            console.dir('headers', result.headers);
            console.dir('status code', result.statusCode);
            let bodyObj = JSON.parse(body);

            User.findOne({_id: req.query.state}, (err, user) => {
                if (user) {
                    user.fitbit = bodyObj;
                    user.save();
                    res.redirect('/');
                }
            });

        });
    });


    // mail
    router.route('/user/:id/sendmail').post(function(req, res){
        console.log(req.body);

        // TOOK OUT CREDS
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            }
        });

        console.log(__dirname);
        var mailOptions = {
            from: 'sixpactapp@gmail.com',
            to: req.body.email,
            subject: req.body.subject,
            // text: req.body.text,
            html: '<img src="cid:sixpactapp@gmail.com">',
            attachments: [{
                filename: 'six-pact-logo.png',
                path: __dirname + '/six-pact-logo.png',
                cid: 'sixpactapp@gmail.com' //same cid value as in the html img src
            }]
        };

        return transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return res.status(400);
            } else {
                console.log('Email sent: ' + info.response);
                return res.sendStatus(200);
            }
        });
    });

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

}
