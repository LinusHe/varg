/* eslint-disable no-console */
//Node.js setup for interface between front and backend
//to test:
//cd to code
//node api.js
//open localhost:8080 (works with serve code:  App running at: - Local:   http://localhost:8080/)

//uses express module 
const express = require('express');
const mysql_driver = require('mysql');

//MySQL Driver configuration
const con=mysql_driver.createConnection({
    host: "localhost",
    user: "varg",
    password: "VarG2020"
});

//Node connects to DB
con.connect(function(err) {
    if (err){
        console.log("Connection failed!");
        throw err;
    }
    console.log("Connected!");
});

//api is the object variable to access the express functionality
const api = express();

//8080 is the port number -> probably needs to change
api.listen(8080, () => {
     console.log('API listens to Localhost');
 });

//When accessing the root ('/') of the site (the localhost:8080)
//a get request is send. The api will intercept and and do
//the stuff defined here (req is the request, res is the response)
//req gives you a lot of information about the request
api.get('/master', (res) => {
    console.log('I was here');
    res.redirect('http://varg.nfl-server.de');
});