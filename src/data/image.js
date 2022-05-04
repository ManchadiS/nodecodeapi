var express = require('express');
var router = express.Router();
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const imageModel = require('../../model/imageModel');
router.post('/saveImage', (req, res) => {

  var saveImageObj = new imageModel({
    imageLink: req.body.imageLink
  });
  saveImageObj.save(function (error, resp) {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(200).send({ status: true, msg: 'Image Added Successfully.' })
    }
  })
});


module.exports = router;



