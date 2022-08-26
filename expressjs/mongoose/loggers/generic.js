function simpleLogger(request, response, next) {
    console.log(`${request.method} - ${request.url}`);
    next(); // call next piece of middleware in the stack
}

module.exports.logHitSpecialEndpoint = (request, response, next) => {
    console.log("Hit /special endpoint");
    next();
}

// export a single function on the exports object
module.exports.simpleLogger = simpleLogger;

// Export all at once on same object
// module.exports = {
//     simpleLogger,
//     logHitSpecialEndpoint
// }