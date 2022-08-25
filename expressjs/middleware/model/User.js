function User(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
}

// export the User function constructor
module.exports = User;
// module.exports refers to 'this' module (file)
// by default, module.exports is an empty object