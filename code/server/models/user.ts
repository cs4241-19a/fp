import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';


const logSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    unit: String,
    date: Date
});

const userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true, lowercase: true, trim: true},
    password: String,
    role: String,
    avatarUrl: { type: String, default: ""},
    stats: {
        starting_weight: { type: Number, default: ""},
        goal_weight: { type: Number, default: ""},
        current_weight: { type: Number, default: ""},
        weight_unit: { type: String, default: "lbs" },
        date_joined: { type: Date, default: Date.now },
        date_of_birth: { type: Date, default: "" },
        occupation: { type: String, default: ""}
    },
    preferences: {
        notifications: { type: Boolean, default: true },
        emails: { type: Boolean, default: true }
    },
    pact: {type: mongoose.Schema.Types.ObjectId, ref: 'Pact'},
    logs: [logSchema],
    fitbit: mongoose.Schema.Types.Mixed,
    notifications: [{
        text: String,
        date: Date,
        read: Boolean
    }],
    calendar: [Object],
    badges: [{
        message: {type: String, default: ""},
        type: { type: String, default: ""},
        imgUrl: { type: String, default: ""}
    }]
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);

export default User;
