const express = require("express");
const db = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\Database\\mysql-connector.js");
const assert = require("assert");
const router = express.Router();
const jwt = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\helper\\jwt.js");
const User = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\models\\user.js");
const Apartment = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\models\\apartment.js");
const Reservation = require("C:\\Users\\halil\\WebstormProjects\\prog4-eindopdracht\\models\\reservation.js");


router.all("*", function(req, res, next) {
    assert(
      typeof req.headers["x-access-token"] == "string",
      "token is not a string!"
    );

    const token = req.header("X-Access-Token") || "";

    jwt.decodeToken(token, (err, payload) => {
        if (err) {
            console.log("Error handler: " + err.message);
            next(err);
        } else {
            next();
        }
    });
});


router.get("/appartments", (req, res, next) => {

    const query = {
        sql: `
        SELECT apartment.ApartmentId, apartment.Description, apartment.StreetAddress, apartment.PostalCode, apartment.City, user.FirstName, user.LastName 
        FROM apartment INNER JOIN user ON apartment.UserId = user.UserId;
      `,
        values: [],
        timeout: 2000
    };

    try {
        db.query(query, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json(rows)
                } catch(err) {
                    next(err)
                }
            }
        })
    } catch(err) {
        next(err)
    }

});

router.post("/appartments", function(req, res, next) {

    try {
        assert(typeof req.body.streetAddress === "string", "StreetAddress is not a string!");
        assert(typeof req.body.postalCode === "string", "PostalCode is not a string!");
        assert(typeof req.body.city === "string", "City is not a string!");
        assert(typeof req.body.description === "string", "description is not a string!");



        const apartment = new Apartment(req.body.streetAddress,req.body.postalCode,
          req.body.city,req.body.description,req.userId);

        const query = {
            sql: "INSERT INTO `Apartment`(Description, StreetAddress, PostalCode, City, UserId) VALUES (?,?,?,?,?)",
            values: [apartment.description,apartment.streetAddress,apartment.postalCode,apartment.city,apartment.userId],
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
        next(ex);
    }
});


router.get("/appartments/:id", function(req, res, next) {


    assert(typeof req.params.id === "string", "id is not a Integer!");


    const guery = {
        sql: `SELECT apartment.ApartmentId, apartment.Description, apartment.StreetAddress, apartment.PostalCode, apartment.City, user.FirstName, user.LastName 
        FROM apartment INNER JOIN user ON apartment.UserId = user.UserId WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };

    const reseverinQuery = {
        sql: `SELECT StartDate, EndDate Status 
        FROM reservation WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };


    try {
        db.query(guery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json(rows)
                } catch(err) {
                    next(err)
                }
            }
        })
        db.query(reseverinQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json(rows)
                } catch(err) {
                    next(err)
                }
            }
        })
    } catch(err) {
        next(err)
    }
});

router.put("/appartments/:id", function(req, res, next) {


    assert(typeof req.params.id === "string", "id is not a Integer!");

    const address = req.body.streetAddress || ''
    const postalCode = req.body.postalCode || ''
    const city = req.body.city || ''
    const description = req.body.description || ''

    var apartment = new Apartment;

    const oldInfoApartmentQuery = {
        sql: `SELECT * FROM apartment WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };


    try {
        db.query(oldInfoApartmentQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json(rows)
                    if(req.userId != rows[0].UserId){
                        throw new Error("Het is niet jouw apartment");
                    }
                    apartment = new Apartment(rows.StreetAddress,rows.PostalCode,rows.City,rows.Description,rows.UserId);
                } catch(err) {
                    next(err)
                }
            }
        })

        if(address !== ' '){apartment.streetAddress = address;}

        if(postalCode !== ' '){apartment.postalCode = postalCode;}

        if(city !== ' '){apartment.city = city;}

        if(description !== ' '){apartment.description = description;}

        const updateIfnoApartmentQuery = {
            sql: `UPDATE table SET StreetAddress = ?, PostalCode = ?, City = ? Description = ? 
                    WHERE ApartmentId = ?;`,
            values: [apartment.streetAddress,apartment.postalCode,apartment.city,apartment.description],
            timeout: 2000
        };

        db.query(updateIfnoApartmentQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json(rows)
                } catch(err) {
                    next(err)
                }
            }
        })
    } catch(err) {
        next(err)
    }
});

router.delete("/appartments/:id", function(req, res, next) {

    assert(typeof req.params.id === "string", "id is not a Integer!");



    const apartIdQuery = {
        sql: `SELECT UserId FROM apartment WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };

    const reservationDeleteQuery = {
        sql: `DELETE FROM reservation WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };


    const apartmentDeleteQuery = {
        sql: `DELETE FROM apartment WHERE ApartmentId = ?;`,
        values: [req.params.id],
        timeout: 2000
    };

    try {
        db.query(apartIdQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    if(req.userId != rows[0].UserId){
                        throw new Error("Het is niet jouw apartment");
                    }
                } catch(err) {
                    next(err)
                }
            }
        })


        db.query(reservationDeleteQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            }
        })


        db.query(apartmentDeleteQuery, (err, rows, fields) => {
            if(err) {
                next(err)
            } else {
                try {
                    res.status(200).json("succes")
                } catch(err) {
                    next(err)
                }
            }
        })
    } catch(err) {
        next(err)
    }
});






router.all("*", function(req, res, next) {
    next(new Error("Unknown endpoint"));
});

module.exports = router;