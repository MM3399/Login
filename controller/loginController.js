//importing 3rd party modules
const chalk = require('chalk');
const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');

//importing local modules
const logInData = require('../model/signinModel');

var verifyOtp = [];

const options = {
    auth: {
        api_key: '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 '
    }
}

const transporter = nodemailer.createTransport(sendGridTransport(options))

exports.logIn = (req, res) => {
    jwt.sign({ email: req.body.email }, 'meet', function (err, token) {
        logInData.findOne({ email: req.body.email }, (err, data) => {
            if (err) {
                console.log(chalk.red(err));
                res.json("Server side error. Sorry for the inconvenience")
            }
            else {
                if (data === null)
                    res.json("No user with the given email exists");
                else{
                    if(data.password === req.body.password){
                        res.setHeader("Authorization", "Bearer " + token)
                        res.json("Authenticated successfully");
                    }
                    else{
                        res.json("Enter your correct password");
                    }
                                                        
            }
            }
        })
    });

}

function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}



exports.forgotPassowrd = (req, res) => {
    let otp = generateOTP()
    verifyOtp.push({ email: req.body.email, otp: otp })
    console.log(verifyOtp)
    const mailOptions = {
        from: 'mehtameet3399@gmail.com',
        to: req.body.email,
        subject: 'OTP for changing passoword',
        html: '<div><h1>OTP is  ' + otp + '</h1></div>'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json("Due to server error mail was not sent");
        } else {
            console.log('Email sent:');
            res.json("Mail has been sent to the the given email");
        }
    });

}

exports.resetPassword = (req, res) => {
    let id = verifyOtp.findIndex((user, index) => {
        return user.email === req.body.email
    })
    if (verifyOtp[id].otp === req.body.otp) {
        logInData.findOne({ email: req.body.email }, (err, data) => {
            if (err) {
                res.json("Server error. Sorry for the inconvenience");
                console.log(chalk.red(err));
            }
            else {
                data.password = req.body.password;
                data.save();
                res.json("Data successfully changed");
                verifyOtp.splice(id, 1);
                console.log(verifyOtp , data)
            }
        })
    }
}

exports.verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next()
    }
    else{
        res.send("You do not have authorization");
        res.end();
    }
}

exports.user = (req,res)=>{
    jwt.verify(req.token, 'meet' , (err,authData)=>{
        if(err){
            console.log(err)
            res.send("You do not have authorization");
        }
        else{
            if (req.body.email === 'mehtameet3399@gmail.com' && req.body.password === 'meet3399') {
                logInData.find((err, data) => {
                    if (err) {
                        res.json("Sorry for the inconvenience. It's a server side error");
                    }
                    else {
                        res.json(data)
                    }
                })
            }
            else{
                res.json("Not admin")
            }
        }
    })
    
}