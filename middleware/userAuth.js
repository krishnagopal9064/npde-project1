const UserModel = require("../model/apiUserModel");

exports.checkDuplicateEntries = (req, res, next) => {
   UserModel.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                console.log(err);
                return;
            }
            if (email) {
                return res.status(404).json({
                    result: email,
                    message: "Email Already Exists"
                });
            }
            UserModel.findOne({
                contact : req.body.contact
            }).exec((err,contact)=>{
                if(err) {
                    console.log(err);
                    return
                }
                if (contact) {
                    return res.status(404).json({
                        result: contact,
                        message: "Contact Number Already Exists"
                    });
                }
            })
            next();
        })
}

const jwt = require("jsonwebtoken");
exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, "abhishek-23051998@#1!4959", (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}