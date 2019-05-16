const config = require("..\\prog4-eindopdracht\\config\\config.json");
const express = require("express");
const bodyParser = require("body-parser");
const auth = require("..\\prog4-eindopdracht\\routes\\auth.js");
const api = require("..\\prog4-eindopdracht\\routes\\api.js");
const logger = require("tracer").dailyfile({
    root: "./logs",
    maxLogFiles: 10,
    allLogsFileName: "verhuren",
    format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
    dateformat: "HH:MM:ss.L"
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all("*", function(req, res, next) {
    logger.info("%s", req.hostname);
    next();
});

app.use("/auth", auth);
app.use("/api", api);

function errorLoggerHandler(err, req, res, next) {
    logger.error("%s",err.message);
    next(err);
}


function errorResponseHandler(err, req, res, next) {
    res.status(500);
    res.json({ mgs: "error" });
}


app.use(errorLoggerHandler);
app.use(errorResponseHandler);

const port = process.env.PORT || config.remote.port;
const server = app.listen(port, () => {
    console.log(
        "server happend at port: " + server.address().port
    );
});

module.exports = app;