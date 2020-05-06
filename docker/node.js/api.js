/* eslint-disable no-console */
//Node.js setup for interface between front and backend
//to test:
//cd to code
//node api.js

//uses express module 
const express = require('express');
const mysql_driver = require('mysql');
const parser = require('./APIparser')

const config = {
    host: "192.168.99.101",
    user: "varg",
    password: "VarG2020",
    database: "vargdb"
};

//MySQL Driver configuration
const con=mysql_driver.createConnection(config);

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

//---------------------
//ROUTES for our API

let router = express.Router();

//middleware functionality (inspection, logging etc.) here
router.use(function(req,res,next) {
    console.log("middleware could happen here");
    //this will allow to (only) access the resources from the specified address
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); //continue past middleware
});

//test route
router.get('/', (req, res) =>{
    res.json({message: 'api is responsive'});
});

//any additional routes here

//(graph)
router.route('/graph')
    //get all graphs - should probably be reserved to higher authority roles
    .get(function (req, res) {
        console.log('Sending all Graphs');
        con.query("SELECT graphObject FROM cytographs", function(err, result) {
            if (err) throw err;
            console.log("Query was successful !");
            res.send(result);
        });
    })
    //post a graph
    .post(function(req,res) {

    });

//graph/:graph_id

router.param('graph_id', function(req, res, next, id)   {
    //check if Graph with id exists within database
    console.log("Something should happen here.");
    next();
});

router.route('/graph/:graph_id')
    //get a single graph identified by id
    .get(function(req, res) {
        //the query should still involve some check if the user "owns" the graph
        //example: SELECT graphObject FROM cytographs WHERE fileID=1 AND user=jdeo
    })
    //update a single graph identified by id
    .put(function(req, res) {

    })
    //delete a single graph identified by id
    .delete(function(req, res) {

    });

//route for testing purposes - remove in build
router.route('/test')

    .get(function(req, res) {
        res.send(parser.ParseRequest());
    })
    .post(function(req, res) {

    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    });

//---------------------

//REGISTER routes 

//prefix any routes with /VarG
api.use('/VarG', router);

//---------------------

//START the server

//8080 is the port number -> probably needs to change
api.listen(8080, () => {
    console.log('API listens to 8080');
});