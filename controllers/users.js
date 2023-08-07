const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try { //add custom try and catch with flash for client side conveniece without extra redirection on Error.ejs page
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password); // method take pw and hash it, then stores in users bd 
        req.login(registeredUser, err => { // login registeredUser after registration
            if (err) return next(err); // is err(unluckely)
            req.flash('success', 'Welcome to Yelp Camp!');// if fine
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message); //beautiful error message instead of typical mongoose built message 
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}
