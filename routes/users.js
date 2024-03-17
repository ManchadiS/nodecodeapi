var express = require('express');
var router = express.Router();

const Users = require('../src/data/user');
router.use("/users", Users);

module.exports = router;

