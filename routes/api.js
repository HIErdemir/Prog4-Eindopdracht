const express = require("express");
const db = require("./Database/mysql-connector");
const assert = require("assert");
const router = express.Router();
const jwt = require("./helper/jwt");
const User = require("./models/user");
const Apartment = require("./routes/apartment");
const Reservation = require("./routes/reservation");


router.all("*", function(req, res, next) {

    assert(typeof req.headers["x-access-token"] == "string", "token is not a string!");

    const token = req.header("X-Access-Token") || "";

    jwt.decodeToken(token, (err, payload) => {
        if (err) {
            payload.
            console.log("Error handler: " + err.message);
            next(err);
        } else {
            next();
        }
    });
});