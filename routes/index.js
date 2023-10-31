const express = require("express");
const router = express.Router();

const pingRoutes = require("./ping");
const bookRoutes = require("./books");

pingRoutes(router);
bookRoutes(router);

module.exports = router;
