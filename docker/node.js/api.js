/* eslint-disable no-console */
//Node.js setup for interface between front and backend

//uses express module and mysqljs 
const express = require('express');
const mysql_driver = require('mysql');

//config object holds information for database access
const config = {
    // eheldt: 192.168.1.103
    // jhohlfel: 192.168.99.101
    //host => adress of database server
    host: "192.168.99.101",
    //user that accesses the database
    user: "varg",
    //password to be used (has to match database password)
    password: "VarG2020",
    //which database on the server to access
    database: "vargdb"
};

//MySQL Driver configuration
const con = mysql_driver.createConnection(config);

//Node connects to DB, test
con.connect(function(err) {
    //if an error occures during connection handle it here
    if (err){
        //shows up in the server log
        console.log("Test: Connection failed!");
        //rethrows error
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
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next(); //continue past middleware
});

//test route ('/' = root)
router.get('/', (req, res) =>{
    res.json({message: 'api is responsive'});
});

//any additional routes here

//parser for body information in post requests
let bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//authenticate user by requesting their role (student or admin) from the DB
function authenticate (userName, callback) {
    con.query('SELECT role FROM userreg WHERE userName = ?', [userName],
    function (err, result) {
        if (err) throw err;
        if (result[0]) return callback(result[0]['role']);
        else return callback('none');
    });
}

//login
router.route('/login?')
    //catch the login-Request
    .post(function (req, res) {
        console.log("Sending Log-In data.");
        //access the information send in the request body
        let userName = req.body.user;
        let password = req.body.password;
        console.log(userName + ", " + password);
        con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ?) as "user_exists"', [userName], 
        function(err, result, fields) { 
            if (err) throw err;
            console.log("Checking if user exists ...");
            if (result[0]['user_exists']) {
                con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ? AND password = ?) as "matching_pw"', [userName, password],
                function (err, result) {
                    if (err) throw err;
                    console.log("User exists. Checking if password matches ...");
                    if (result[0]['matching_pw']) {
                        authenticate(userName, function (role) {
                            console.log("Correct password. Logging in existing user",userName,"with role '"+role+"' ...");
                            if (role === 'admin') {
                                //account information
                                let user = {
                                    name: userName,
                                    role: 'admin',
                                    issued: Date.now(),
                                    authenticated: true //lets the client know that login was succesfull
                                }
                                //Sends user object back to client
                                res.send(user);
                            }
                            else if (role === 'student') {
                                let user = {
                                    name: userName,
                                    role: 'student',
                                    issued: Date.now(),
                                    authenticated: true
                                }
                                res.send(user);
                            }
                            else {
                                console.log("Something went wrong during authentication. Aborting Login.");
                                //error 403 = "forbidden"
                                res.sendStatus(403); //didn't receive a role for the user which means something went wrong
                            }
                        });
                    }
                    else {
                        console.log("Wrong password. Invalid Login.");
                        res.sendStatus(403); //entered existing user with wrong password
                    }
                });
            }
            else {
                console.log("User doesn't exist. Creating new account ...");
                account = {
                    userName: userName,
                    password: password
                }
                con.query("INSERT INTO userreg SET ?", account,
                function(err, result, fields) {
                    if (err) throw err;
                    console.log("Successfully created new user account. Logging in new user",userName,"with role 'student' ...");
                    let user = {
                        name: userName,
                        role: 'student',
                        issued: Date.now(),
                        authenticated: true
                    }
                    res.send(user);
                });
            }
        });
    });


//(graph)
router.route('/graph?')
    //post a graph
    .post(function(req,res) {
        console.log('Attempting to post a graph with filename:',req.body.filename);
        //all information needed for creating a new entry, read from request body
        let post = {
            fileName: req.body.name, 
            userName: req.body.user, 
            graphObject: req.body.json
        };
        //query syntax makes safe string escapes, (protection against injections)
        con.query("INSERT INTO cytographs SET ?", post,
        function(err, result, fields) {
            if (err) throw err;
            console.log("Post was succesfull.");
            //status 200 = "Succesful"
            res.sendStatus(200);
        });
    });

//user=student can only access the graphs under their username
//user=admin can access all graphs in the DB

//get metadata of all graphs from specified user or from all users if user=admin
router.route('/graph/meta')
    .get(function (req, res) {
        let userName = req.query.user;
        let userRole = req.query.role;
        let query = '';
        let values = [];
        console.log('Requesting metadata ...');
        if (userRole === 'admin') {
            query = 'SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs';
        }
        else if (userRole === 'student') {
            query = 'SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs WHERE userName = ?';
            values = [userName];
        }
        else {
            console.log('Insufficient rights. Aborting request.')
            res.send({'data': []});
        }
        con.query(query, values, function(err, result, fields) {
            if (err) throw err;
            console.log("Successfully received metadata. Sending to client.");
            res.send(result);
        });
    });

//everytime a call to the api is made with the structure /graph/:file_name,
//this code will be called.
//It makes sure that the specified graph exists in the database
router.param('file_name', function(req, res, next, fileName)   {
    //check if Graph with fileName+userName exists within database
    let userRole = (req.query.role ? req.query.role : req.body.role);
    let userName = '';
    if (userRole === 'admin') {
        userName = (req.query.role ? req.query.author : req.body.author);
    }
    else if (userRole === 'student') {
        userName = (req.query.role ? req.query.user : req.body.user);
    }
    else {
        console.log('Insufficient rights. Aborting request.');
        throw new Error;
    }
    console.log("Checking Database for graph ...");
    con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], 
        function(err, result, fields) {
            if (err) {
                //connection issues may exist and the graph could still be in the db
                console.log("Could not find graph in Database. Aborting request.");
                //route will not continue nad throw an error
                throw err;
            }
            else{
                console.log("Found graph in the Database. Continuing with request ...");
                //next - route will continue normally
                next();
            }
    });
});

router.route('/graph/:file_name?')
    //get a single graph identified by fileName+userName
    .get(function(req, res) {
        let fileName = req.params.file_name;
        let userRole = req.query.role;
        let userName = '';
        console.log("Requesting graph from Database ...");
        if (userRole === 'admin') {
            userName = req.query.author;
        }
        else if (userRole === 'student') {
            userName = req.query.user;
        }
        else {
            console.log('Insufficient rights. Aborting request.');
            res.send({'data': []});
        }
        con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], 
            function(err, result, fields) { 
                if (err) throw err;
                console.log("Successfully received graph. Sending to client.");
                res.send(result);
        });
    })
    //update a single graph identified by fileName+userName
    .put(function(req, res) {
        let put = {
            graphObject: req.body.json,
            fileName: req.params.file_name,
            userName: req.body.user
        }
        console.log('Requesting override on graph in Database ...');
        con.query("UPDATE cytographs SET graphObject = ? WHERE fileName = ? AND userName = ?", [put.graphObject, put.fileName, put.userName],
            function(err, result, fields) {
                if (err) throw err;
                console.log('Successfully overwrote graph. Closing request.');
                res.sendStatus(200);
        });
    })
    //delete a single graph identified by fileName+userName
    .delete(function(req, res) {
        let fileName = req.params.file_name;
        let userRole = req.query.role;
        let userName = '';
        console.log("Requesting deletion of graph from Database ...");
        if (userRole === 'admin') {
            userName = req.query.author;
        }
        else if (userRole === 'student') {
            userName = req.query.user;
        }
        else {
            console.log('Insufficient rights. Aborting request.');
            res.sendStatus(403);
        }
        con.query("DELETE FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName],
            function(err, result, fields)   {
                if (err) throw err;
                console.log('Successfully deleted graph. Closing request.');
                res.sendStatus(200);
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
//on server: port 80 (HTTP), port 443 (HTTPS)
api.listen(8080, () => {
    console.log('API listens to 8080');
});