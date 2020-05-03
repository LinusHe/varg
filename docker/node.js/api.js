/* eslint-disable no-console */
//Node.js setup for interface between front and backend
//to test:
//cd to code
//node api.js

//uses express module 
const express = require('express');
const mysql_driver = require('mysql');

//MySQL Driver configuration
const con=mysql_driver.createConnection({
    host: "192.168.99.101",
    user: "varg",
    password: "VarG2020",
    database: "vargdb"
});

//Node connects to DB, test
con.connect(function(err) {
    if (err){
        console.log("Test: Connection failed!");
        throw err;
    }
    console.log("Test: Connected!");
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
api.get('/master', (req,res) => {
    console.log('I was here '+ req);
    res.redirect('http://varg.nfl-server.de');
});

api.get('/Graph/ID_1', (req, res) => {
    console.log('I was here '+ req);
    con.query("SELECT graphObject FROM cytographs WHERE fileId=1", function(err, result) {
        if (err) throw err;
        console.log("Query was successful ! " + result);
        res.send(result);
    });
})