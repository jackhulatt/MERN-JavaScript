const passport = require('passport');
const router = new require('express').Router();
const User = require('../model/User');

router.get('/login', (request, response) => {
    response.sendFile(global.__basedir + '/public/login.html');
});

router.get('/register', (request, response) => {
    response.sendFile(global.__basedir + '/public/register.html');
});

router.post('/login', passport.authenticate('local', {
    failureMessage: 'Invalid login credentials.',
    failureRedirect: '/'
}), (request, response) => {
    // upon successful login, passport will automatically create an express session for us to use
    response.status(200).send(request.user._id);
});

router.post('/register', async (request, response) => {
    try {
        // register the user
        const user = await User.register(new User({
            username: request.body.username
        }), request.body.password); // register(userWithUsername, password)

        if (user) {
            passport.authenticate("local");
            return response.status(200).send();
        }
    } catch (error) {
        console.error(error);
    }
    response.status(400).send('Something went wrong registering the user...');
});

router.post('/logout', (request, response) => {
    request.logout((error) => {
        if (error) return next(error);
        response.cookie('connect.sid', "", {
            httpOnly: true,
            path: '/',
            domain: 'localhost',
            expires: new Date(1)
        });
        response.redirect('/login');
    });
});

module.exports = router;