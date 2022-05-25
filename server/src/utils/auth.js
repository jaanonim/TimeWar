require("dotenv").config();
const authInfo = (req, res, next) => {
    const err = req.session.error;
    const msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
};
const authenticate = (name, pass, fn) => {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    if (name !== process.env.admin_login || pass !== process.env.admin_password) return fn(null, false);
    return fn(null, true);
};

const restrict = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/admin/');
    }
};
module.exports = {authInfo, authenticate, restrict};
