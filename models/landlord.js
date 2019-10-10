let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let LandlordSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    username: String,
    password: String
});

LandlordSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Landlord", LandlordSchema);