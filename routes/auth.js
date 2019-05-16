const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\models\\user.js");
const db = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\Database\\mysql-connector.js");
const bcrypt = require("bcryptjs");
const jwt = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\helper\\jwt.js");

const Rounds = 7;

router.post("/register", function(req, res, next) {

  try {
    assert(typeof req.body.firstName === "string", "FirstName is not a string!");
    assert(typeof req.body.lastName === "string", "LastName is not a string!");
    assert(typeof req.body.streetAddress === "string", "StreetAddress is not a string!");
    assert(typeof req.body.postalCode === "string", "PostalCode is not a string!");
    assert(typeof req.body.city === "string", "City is not a string!");
    assert(typeof req.body.dateOfBirth === "string", "DateOfBirth is not a string!");
    assert(typeof req.body.phoneNumber === "string", "PhoneNumber is not a string!");
    assert(typeof req.body.email === "string", "EmailAddress is not a string!");
    assert(typeof req.body.password === "string", "Password is not a string!");


    const hash = bcrypt.hashSync(req.body.password, Rounds);
    const user = new User(req.body.firstName,req.body.lastName,req.body.streetAddress,req.body.postalCode,
      req.body.city,req.body.dateOfBirth,req.body.phoneNumber,req.body.email, hash);

    console.log(user);

    const query = {
      sql: "INSERT INTO `user`(FirstName, LastName, StreetAddress, PostalCode, City, DataOfBirth, PhoneNumber, EmailAddress, Password) VALUES (?,?,?,?,?,?,?,?,?)",
      values: [user.firstName,user.lastName,user.streetAddress,user.postalCode,user.city,user.dateOfBirth,user.phoneNumber,user.email,user.password],
      timeout: 2000
    };

    db.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

router.post("/login/:email/:password", function(req, res, next) {
  try {


    assert(typeof req.params.email === "string", "Email is not a string!");
    assert(typeof req.params.password === "string", "Password is not a string!");

    // Construct query object
    const query = {
      sql: "SELECT UserId, Password FROM `user` WHERE `EmailAddress`=?",
      values: [req.params.email],
      timeout: 2000
    };

    db.query(query, (err, rows, fields) => {
      if (err) {
        next(err);
      } else {
        if (
          rows.length === 1 &&
          bcrypt.compareSync(req.params.password, rows[0].Password)
        ) {
          token = jwt.encodeToken(rows[0].userId);
          res.status(200).json({ token: token });
        } else {
          next(new Error("Invalid login, bye"));
        }
      }
    });
  } catch (ex) {
    next(ex);
  }
});



router.all("*", function(req, res, next) {
  next(new Error("Unknown endpoint"));
});

module.exports = router;
