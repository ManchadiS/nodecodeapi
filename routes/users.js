var express = require('express');
var router = express.Router();

const Users = require('../src/data/user');
const Hotels = require('../src/data/hotel');

router.use("/users", Users);
router.use("/hotels", Hotels);

module.exports = router;

