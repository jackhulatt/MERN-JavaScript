// function User(id, username, password, email) {
//     this.id = id;
//     this.username = username;
//     this.password = password;
//     this.email = email;
// }

// import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // get the Schema type

// create a new instance of Schema
// - pass it a JS object representing the structure of our documents in a collection
const userSchema = new Schema({
    // _id will be automatically generated
    username: String,
    password: String,
    email: {
        type: String,
        minLength: [8, 'Email must be specified and must be between 8 and 128 characters long.'],
        maxLength: 128,
        unique: true, // must be a unique email
        trim: true, // trim whitespace
        required: [true, 'Email is required.'],
        match: /^[a-z]+@[a-z]+[.][a-z]+/ // match accepts a regular expression (regex)
    },
    createdAt: {
        type: Date,
        default: Date.now() // when this is created, default to Date.now()
    }
}, {
    // schema options
    strict: true // allows insertion of new properties on the fly if set to false
});

// create a model from the schema
const User = mongoose.model("User", userSchema);

// export the created User model
module.exports = User;
// module.exports refers to 'this' module (file)
// by default, module.exports is an empty object