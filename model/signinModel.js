//importing 3rd party modules
const mongoose = require('mongoose');

//declaring schema

const signinSchema = new mongoose.Schema({
    email: String,
    password: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("signIn", signinSchema);