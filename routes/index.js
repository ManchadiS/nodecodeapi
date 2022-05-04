var express = require('express');
var router = express.Router();

const Users = require('../src/data/image');
router.use("/image", Users);
module.exports = router;

