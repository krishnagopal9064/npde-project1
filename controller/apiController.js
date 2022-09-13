const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../model/apiUserModel");
const jwt = require("jsonwebtoken");

exports.index=(req,res)=>{
  UserModel.find = (err, data) => {
    if (!err) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "exceuted successfully",
      });
    } else{
      console.log(err);
    }
  };
}
exports.register = (req, res) => {
  UserModel({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    address: req.body.address,
  })
    .save()
    .then((data) => {
      res.status(200).json({
        status: "Successfully",
        result: data,
        message: "Successfully fetched User",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        result: err,
        message: "Add failed",
      });
    });
};

exports.login = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      const hashpassword = data.password;
      if (bcrypt.compareSync(req.body.password, hashpassword)) {
        const userToken = jwt.sign(
          {
            id: data._id,
            name: data.name,
          },
          "krishna_1999#2022@",
          { expiresIn: "10m" }
        );
        res.cookie("userToken", userToken);
        if (req.body.rememberme) {
          res.cookie("email", req.body.email);
          res.cookie("password", req.body.password);
        }
        console.log("Login Data : ", data);
        res.status(200).json({
          status: "success",
          result: data,
          message: "Login....",
        });
      } else {
        res.status(404).json({
          result: err,
          message: "Invalid Password",
        });
      }
    } else {
      res.status(404).json({
        result: err,
        message: "Invalid Email",
      });
    }
  });
};
