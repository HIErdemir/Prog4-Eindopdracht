const mysql = require('mysql')
const config = require("src/config/config.json")
const logger = require("tracer").colorConsole()


const connectionSettings = {
    connectionLimit: 20,
    host: process.env.DB_HOST || config.remote.dbServer,
    user: process.env.DB_USER || config.remote.dbUsername,
    password: process.env.DB_PASSWORD || config.remote.dbPassword,
    database: process.env.DB_DATABASE || config.remote.dbSchema,
    port: config.remote.port,
    debug: false
};

var pool;

pool = mysql.createPool(connectionSettings);

pool.on("acquire", connection => {
    logger.trace("Connection %d acquired", connection.threadId);
});

pool.on("connection", connection => {
    logger.trace("Connection to database was made");
});

pool.on("enqueue", () => {
    logger.trace("Waiting for available connection slot");
});

pool.on("release", connection => {
    logger.trace("Connection %d released", connection.threadId);
});

module.exports = pool;