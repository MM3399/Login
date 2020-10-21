//importing 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const bodyParser = require('body-parser');


//importing local modules
const router = require('./routes/routes');


const app = express();    //creating an object of express module
const port = 3000;

app.use(cors());         //enabling cors so we can send request from different client server also
app.use(bodyParser.json());       //to parse our data in json format and store in req.body
app.use(bodyParser.urlencoded({ extended: true }))    //to parse from data and store in req.body
app.use(router);                    //All the routes are defined in it



//Creating a server
app.listen(port, (err) => {
    if (err)
        console.log(chalk.red("Server was not created due to the following error", err))
    else
        console.log(chalk.blue("Server created and running at port ", port))
});

//Connecting to the Database

mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', error => {
    if (error)
        console.log(chalk.red("Database not connected due to the following error", error));
});
mongoose.connection.on('connected', () => {
    console.log(chalk.yellow("Database connected"));
});
