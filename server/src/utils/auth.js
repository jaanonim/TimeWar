const jwt = require("jsonwebtoken");
require("dotenv").config();

const authInfo = (req, res, next) => {
    next();
};
const authenticate = (name, pass, fn) => {
    if (!module.parent) console.log("authenticating %s:%s", name, pass);
    if (name !== process.env.admin_login || pass !== process.env.admin_password)
        return fn(null, "");
    let token = jwt.sign(
        { login: process.env.admin_login },
        process.env.jwt_token
    );

    return fn(null, token);
};

const restrict = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.jwt_token, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.status("401");
        res.send();
    }
};
module.exports = { authInfo, authenticate, restrict };
