import mongoose from 'mongoose';

//Mongodb Connection Setup
//export const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/'+process.env.DB'
const uri = 'mongodb+srv://webware-cat:Shermanator@cs4241-a5-eqo5u.mongodb.net/test?retryWrites=true&w=majority';
// const uri = 'mongodb+srv://max:DaddyWong@cluster0-hsm77.mongodb.net/When3Meet?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful!');
});

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    globalAvailability: Array
});

export const passwordSchema = new mongoose.Schema({
    salt: String,
    hash: String
});

export const eventSchema = new mongoose.Schema({
    name: String,
    days: Array,
    start: String,
    stop: String,
    availabilities: Object
});

export const User = mongoose.model('W3MUsers', userSchema);
export const Password = mongoose.model('Password', passwordSchema);
export const Event = mongoose.model('Event', eventSchema);