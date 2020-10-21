//importing local modules
const signInData = require('../model/signinModel');


exports.signIn = (req,res)=>{
    let newUser = new signInData({
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
    .then(data=>{
        console.log("New user created");
        res.json("User successfully created");
    })
    .catch(err=>{
        console.log(err);
        res.json("There was some error on server side");

    })
}