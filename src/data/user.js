var express = require('express');
var router = express.Router();
const userModel = require('../../model/userModel');
const multer = require('multer')
const upload = multer({ dest: "profile_images" });
router.post('/saveUser/:id/:name', (req, res) => {
    console.log(req.body, req.params, req.query)
    userModel.find({ $and: [{ email: req.body.email }] }, function (err, response) {
        if (response.length > 0) {
            res.status(403).send({ status: false, msg: 'User Already Exist.' });
        }
        else {
            var saveNewUser = new userModel({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile_number: req.body.mobile_number
            });
            saveNewUser.save(function (error, resp) {
                if (error) {
                    res.status(403).send({ status: false, msg: 'Something Went Wrong' })
                } else {
                    res.status(200).send({ status: true, msg: 'User Added Successfully.', resp: resp })
                }
            })
        }
    })
});

router.get('/userlist', (req, res) => {
    // console.log("rrrrrrrrrrrrr")
    userModel.find({}, function (err, response) {
        // console.log(response)
        if (response) {
            res.status(200).send({ status: true, data: response })
        } else {
            res.status(400).send({ status: false, msg: "somthing went wrong" })
        }
    })
})

router.get('/userdetails/:id', (req, res) => {
    userModel.find({ _id: req.params.id }, function (err, response) {
        if (response.length != 0) {
            res.status(200).send({ status: true, data: response[0] })
        } else {
            res.status(400).send({ status: false, msg: "somthing went wrong" })
        }
    })
})

router.post('/remove', (req, res) => {
    userModel.deleteOne({ _id: req.body.id }, function (err, response) {
        console.log(response)
        if (response) {
            res.status(200).send({ status: true, data: response })
        } else {
            res.status(400).send({ status: false, msg: "somthing went wrong" })
        }
    })
})

router.post('/update', (req, res) => {
    userModel.update({ _id: req.body.id },
        {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                profile_image_url: req.body.profile_image_url
            }
        }, function (err, response) {
            if (response.length != 0) {
                res.status(200).send({ status: true, data: response })
            } else {
                res.status(400).send({ status: false, msg: "somthing went wrong" })
            }
        })
})



router.post('/saveimages', (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, ("/var/www/nodecodeapi/profile_images"));
        },

        filename: (req, file, callback) => {
            name = Date.now() + file.originalname;
            callback(null, name);
        }
    });
    const upload = multer({ storage: storage }).any('filedata');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: helper.getErrorMessage(err)
            });
        }
        let results = req.files.map((file) => {
            // var name=Date.now()+file.filename
            return {
                mediaName: name,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host + "/" + name
            }
        });
        res.status(200).json(results);
    });
});

module.exports = router;



