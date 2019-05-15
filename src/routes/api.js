const express = require("express");
const db = require("src/Database/mysql-connector.js");
const assert = require("assert");
const router = express.Router();
const jwt = require("src/jwt/jwt.js");
const User = require("src/models/user.js");
const Apartment = require("src/models/apartment.js");
const Reservation = require("src/models/reservation.js");


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