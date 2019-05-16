const config = require("..\\config\\config.json");
const moment = require("moment");
const jwt = require("jwt-simple");


function encodeToken(userId) {
    const playload = {
        exp: moment()
            .add(10, "days")
            .unix(),
        iat: moment().unix(),
        sub: userId
    };
    return jwt.encode(playload, config.remote.secretkey);
}


function decodeToken(token, cb) {
    try {
        const payload = jwt.decode(token, config.remote.secretkey);

        // Check if the token has expired
        if (moment().unix() > payload.exp) {
            cb(new Error("token_has_expired"));
        } else {
            cb(null, payload);
        }
    } catch (err) {
        cb(err, null);
    }
}

module.exports = { encodeToken, decodeToken};