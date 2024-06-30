var express = require('express');
var router = express.Router();
const hotelModel = require('../../model/hotelModel');

router.post('/save', (req, res) => {
    console.log(req.body, req.params, req.query)
    hotelModel.find({ $and: [{ name: req.body.name.toLowerCase() }] }, function (err, response) {
        if (response.length > 0) {
            res.status(403).send({ status: false, msg: 'Hotel Already Exist.' });
        }
        else {
            var saveNewHotel = new hotelModel({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                country: req.body.country,
                city: req.body.city,
                states: req.body.states,
                pincode: req.body.pincode,
                address: req.body.address
            });
            saveNewHotel.save(function (error, resp) {
                if (error) {
                    res.status(403).send({ status: false, msg: 'Something Went Wrong' })
                } else {
                    res.status(200).send({ status: true, msg: 'Hotel Added Successfully.', data: resp })
                }
            })
        }
    })
});

router.get('/hotellist', (req, res) => {
    hotelModel.find({}, function (err, response) {
        if (err) {
            res.status(403).send({ status: false, msg: "somthing went wrong" })
        } else {
            if (response.length != 0) {
                res.status(200).send({ status: true, msg: "Success", data: response })
            } else {
                res.status(200).send({ status: false, data: [] })
            }
        }

    })
})

router.get('/hoteldetails/:id', (req, res) => {
    hotelModel.find({ _id: req.params.id }, function (err, response) {
        if (err) {
            res.status(403).send({ status: false, msg: "somthing went wrong" })
        } else {
            if (response.length != 0) {
                res.status(200).send({ status: true, msg: "Success", data: response[0] })
            } else {
                res.status(403).send({ status: false, msg: "Hotel Details Not Exist" })
            }
        }

    })
})

router.post('/remove', (req, res) => {
    hotelModel.deleteOne({ _id: req.body.id }, function (err, response) {
        if (err) {
            res.status(403).send({ status: false, msg: "somthing went wrong" })
        } else {
            if (response) {
                res.status(200).send({ status: true, msg: "Hotel Removed Successfully" })
            } else {
                res.status(403).send({ status: false, msg: "Hotel Not found" })
            }
        }
    })
})

router.post('/update', (req, res) => {
    hotelModel.updateOne({ _id: req.body.id },
        {
            $set: {
                email: req.body.email,
                number: req.body.number,
                country: req.body.country,
                city: req.body.city,
                states: req.body.states,
                pincode: req.body.pincode,
                address: req.body.address
            }
        }, function (err, response) {
            if (err) {
                res.status(403).send({ status: false, msg: "somthing went wrong" })
            } else {
                if (response) {
                    res.status(200).send({ status: true, msg: "Success", data: response })
                } else {
                    res.status(400).send({ status: false, msg: "somthing went wrong" })
                }
            }
        })
})

module.exports = router;



