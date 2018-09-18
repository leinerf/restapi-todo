const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next){
    try {
        //get data and create an instance into the database
        let user = await db.User.create(req.body);
        let { id, username} = user;
        //tokenize for authentication
        let token = jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY
        )
        return res.status(200).json({
            message:"signup successful", 
            token: token,
            id: id,
            username: username
        });
    } catch(err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
          }
          return next({
            status: 400,
            message: err.message
          });
    }
}

exports.signin = async function(req, res, next){
    try {
        let user = await db.User.findOne({email: req.body.email});
        let {id, username, password} = user;
        let isMatch = await user.comparePassword(req.body.password, password);
        if(isMatch){
            let token = jwt.sign({
                id: id,
                username: username
            },
            process.env.SECRET_KEY
            );
            return res.status(200).json({
                message:"signin successful", 
                token: token,
                id: id,
                username: username
            });
        }
        else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
        }
    } catch(err) {
        return next({status: 400, message: "Invalid Email/Password."})
    }
}