const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        maxLength: 16,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minLength: 4,
        maxLength: 16,
        trim: true,
        //required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    contactDetails: [contactSchema]
});

// Adds a hash and salt field, and uses these to encrypt the password
// - also adds some helper methods for validating users
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);