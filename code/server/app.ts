import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as schedule from 'node-schedule';
import * as admin from 'firebase-admin';
import setRoutes from './routes';
import Pact from './models/pact';

const app = express();
dotenv.config();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// TOOK OUT CREDS SO IT WONT WORK
// admin.initializeApp({
//
// });

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
} else {
    mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}

mongoose.Promise = global.Promise;
mongoose.connect(mongodbURI)
    .then(db => {
        console.log('Connected to MongoDB');
        setRoutes(app);

        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        /**
         * Scheduled Jobs
         */
        var everyDayAtNoon = schedule.scheduleJob('* * 12 * * *', function() {
            console.log('[12.00pm] Sending Notifications');
            // Every hour
            Pact.find({}).populate('users').exec(function(error, pacts) {
                pacts.forEach(function(pact) {
                    pact.users.forEach(function(user) {
                        // Check that they have notifications set to true
                        if (user.preferences.notifications) {
                            user.notifications.push({text: 'Remember to Exercise!', date: Date.now(), read: false});
                            user.save();
                        }
                    });
                });
            });
        });

        var everySunday = schedule.scheduleJob('* * 12 * * 0', function() {
            console.log('[12.00pm Sunday] Sending Notifications');
            // TODO: Alert winners
            // Pact.find({}).populate('users').exec(function (error, pacts){
            //     pacts.forEach(function(pact) {
            //         pact.users.forEach(function(user){
            //             user.notifications.push({text: 'Remember to Exercise!', date: Date.now(), read: false});
            //             user.save();
            //         })
            //     });
            // });
        });


        if (!module.parent) {
            app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
        }
    })
    .catch(err => console.error(err));


export {app};
