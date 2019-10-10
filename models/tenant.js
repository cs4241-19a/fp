let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let TenantSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    username: String,
    password: String,
    landlordnum: Number
});

TenantSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Tenant", TenantSchema);