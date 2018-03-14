const mongoose = require("mongoose");
const userModel = mongoose.model("userModel");

module.exports.loginWithFb = function (req, res) {

    res.json({ msg: "Successful login", user: req.user })
}

module.exports.updateAddress = function (req, res) {
    var params = req.body
    if (params.addL1 == null || params.addL2 == undefined || params.state == null || params.state == undefined || params.zipCode == null || params.zipCode == undefined || params.country == null || params.country == undefined) {
        res.status(400)
        return res.json({ msg: "Parameters are not there" })
    }

    userModel.findByIdAndUpdate(req.user.user._id, {
        $set: {
            address: {
                line1: params.addL1,
                line2: params.addL2,
                country: params.country,
                state: params.state,
                zipCode: params.zipCode
            }
        }
    }, function (err, doc) {
        if (err) {
            res.status(400)
            res.json({ msg: err })
        }
        else {
            res.json(doc)
        }
    })

}