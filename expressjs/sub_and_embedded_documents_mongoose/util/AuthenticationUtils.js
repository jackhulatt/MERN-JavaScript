function isAuthenticated(request, response, next) {
    // passport puts an isAuthenticated() method on the request object
    // - we can use this to check if a user is logged in or not
    if (request.isAuthenticated()) return next();
    response.redirect("/login");
    // return response.status(400).send('Not logged in.');
}

module.exports = {
    isAuthenticated
}