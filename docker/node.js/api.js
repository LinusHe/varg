/* eslint-disable no-console */
//Node.js setup for interface between front and backend
//to test:
//cd to code
//node api.js

//uses express module 
const express = require('express');
const mysql_driver = require('mysql');

const config = {
    // eheldt: 192.168.99.101
    // jhohlfel: 192.168.99.101
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
    //TODO: Serverside Verification could happen here with req.query.user 
    //this will allow to (only) access the resources from the specified address
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); //continue past middleware
});

//test route
router.get('/', (req, res) =>{
    res.json({message: 'api is responsive'});
});

//any additional routes here

//parser for body information in post requests
let bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//login
router.route('/login?')
    //get login data
    .get(function (req, res) {
        console.log("Sending Log-In data.");
        let userName = req.params.user;
        let password = req.params.password;
        if (userName === "VarG" && password === "2020"){
            console.log(user + ", willkommen in der Matrix.");
            let user = {
                name: userName,
                role: 'student',
                issued: Date.now(),
                authenticated: true
            }
            res.send(user);
        }
        else res.sendStatus(403);
    });


//(graph)
router.route('/graph?')
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
        console.log('Attempting to post a graph with filename:',req.body.filename);
        let post = {fileID: req.body.fileId,
                    filename: req.body.filename, 
                    userName: req.body.user, 
                    graphObject: req.body.json};
        con.query("INSERT INTO cytographs SET ?", post,
         function(err, result, fields) {
            if (err) throw err;
            console.log("Post was succesfull.");
            res.sendStatus(201);
        });
    });

//does it work ?
//get metadata of all graphs from specified user
router.route('/graph/meta')
    .get(function (req, res) {
        console.log('Sending all metadata of user:',req.query.user);
        let userName= req.query.user;
        con.query('SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileId, fileName, userName FROM cytographs WHERE userName = ?', [userName],
        function(err, result, fields) {
            if (err) throw err;
            console.log("Query was successful !");
            res.send(result);
        });
    });

//graph/:graph_id

router.param('graph_id', function(req, res, next, id)   {
    //check if Graph with id exists within database
    let userName=req.query.user;
    console.log("Checking Database for Graph");
    con.query("SELECT graphObject FROM cytographs WHERE fileID= ? AND userName = ?", [id, userName], 
    function(err, result, fields) {
        if (err) {
            console.log("Graph may not exist.");
            throw err;
        }
        else{
            console.log("Graph does exist.");
            next();
        }
    });
});

router.route('/graph/:graph_id?')
    //get a single graph identified by id
    .get(function(req, res) {
        //the query should involve some check if the user "owns" the graph
        //example: SELECT graphObject FROM cytographs WHERE fileID=1 AND user=jdeo
        let id=req.params.graph_id;
        let userName=req.query.user;
        console.log('Sending Graph with id:',id,', username:',userName);
        con.query("SELECT graphObject FROM cytographs WHERE fileID= ? AND userName = ?", [id, userName], 
        function(err, result, fields) { 
            if (err) throw err;
            console.log("Get-Query was successful!");
            res.send(result);
        });
    })
    //update a single graph identified by id
    .put(function(req, res) {
        console.log('Updating Graph');
        /* req.params.json is not yet implemented*/
        let put = {graphObject: req.body.json,
            fileID: req.body.fileId, 
            userName: req.body.user};
        con.query("UPDATE cytographs SET graphObject= ? WHERE fileID= ? AND userName= ? ", put,
        function(err, result, fields) {
            if (err) throw err;
            console.log("Update-Query succesfull");
            res.sendStatus(200);
        });
    })
    //delete a single graph identified by id
    .delete(function(req, res) {
        let id = req.params.graph_id;
        let userName=req.query.user;
        console.log('Deleting Graph');
        con.query("DELETE FROM cytographs WHERE fileID= ? AND userName= ?", [id, userName],
        function(err, result,fields)   {
            if (err) throw err;
            console.log("Delete-Query succesfull");
            res.send(result);
        });
    });

//route for testing purposes - remove in build
router.route('/test')

    .get(function(req, res) {
        
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