/* eslint-disable no-console */
//Node.js setup for interface between front and backend

//uses express module and mysqljs 
const express = require('express');
const mysql_driver = require('mysql');

//config object holds information for database access
const config = {
    // eheldt: 192.168.1.102
    // jhohlfel: 192.168.99.101
    //host => adress of database server
    host: "192.168.99.101",
    //user that accesses the database
    user: "varg",
    //password to be used (has to match database password)
    password: "l_GD6P67+V",
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
router.route('/login')
    //catch the login-Request
    .post(function (req, res) {
        console.log("Sending Log-In data.");
        //access the information send in the request body
        let userName = req.body.user;
        let password = req.body.password;
        console.log(userName + ", " + password);
        con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ?) AS "user_exists"', [userName], 
        function(err, result, fields) { 
            if (err) throw err;
            console.log("Checking if user exists ...");
            if (result[0]['user_exists']) {
                con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ? AND password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))) AS "matching_pw"', [userName, password, password],
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
                                res.sendStatus(500); //error 500 = "Internal Server Error": didn't receive a role for the user which means something went wrong
                            }
                        });
                    }
                    else {
                        console.log("Wrong password. Invalid Login.");
                        res.sendStatus(403); //error 403 = "Forbidden": entered existing user with wrong password
                    }
                });
            }
            else {
                console.log("User doesn't exist. Creating new account ...");
                con.query('INSERT INTO userreg (userName, password) VALUES (?, AES_ENCRYPT(?, UNHEX(SHA2(?, 512))))', [userName, password, password],
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

//account
router.route("/account")
    .put(function(req, res) {   // user wants to change something in their account
        let type = req.body.type;   // type 0 = userName, 1 = password
        let userName = req.body.user;
        let query = "";
        let values = "";
        function requestEditAccount(query, values) {
            con.query(query, values, function(err, result, fields) {
                if (err) throw err;
                console.log('Successfully changed user account info and '+(result.affectedRows-1)+' graph author(s) with it. Closing request.');
                res.sendStatus(200);
            });
        }
        if(type === 0) {
            console.log("User",userName,"requests to change their username ...");
            let newUserName = req.body.newInfo;
            function checkExistingName(callback) {
                con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ?) AS "user_exists"', [newUserName],
                    function (err, result) {
                        if (err) throw err;
                        if (result[0]['user_exists']) callback(false);
                        else callback(true);
                });
            }
            checkExistingName(function(permitted) {
                if(permitted) {
                    function getGraphCount(callback) {
                        con.query('SELECT COUNT(graphObject) AS "graph_count" FROM cytographs WHERE userName = ?', [userName],
                            function (err, result) {
                                if (err) throw err;
                                console.log("graph_count:",result[0]["graph_count"])
                                callback(result[0]["graph_count"]);
                        });
                    }
                    getGraphCount(function(graphCount) {
                        if(graphCount > 0) {
                            query = "UPDATE userreg AS u, cytographs AS c SET u.userName = ?, c.userName = ? WHERE u.userName = ? AND c.userName = ?";
                            values = [newUserName, newUserName, userName, userName];
                        }
                        else {
                            query = "UPDATE userreg SET userName = ? WHERE userName = ?";
                            values = [newUserName, userName];
                        }
                        requestEditAccount(query, values);
                    });
                }
                else {
                    console.log("Username already exists. Aborting request.");
                    res.sendStatus(403);
                }
            });
        }
        else if(type === 1) {
            console.log("User",userName,"requests to change their password ...");
            let currentUserPW = req.body.password;
            function checkCorrectPW(callback) {
                con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ? AND password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))) AS "matching_pw"', [userName, currentUserPW, currentUserPW],
                    function (err, result) {
                        if (err) throw err;
                        if (result[0]['matching_pw']) callback(true);
                        else callback(false);
                });
            }
            checkCorrectPW(function(permitted) {
                if(permitted) {
                    let newUserPW = req.body.newInfo;
                    query = "UPDATE userreg SET password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512))) WHERE userName = ?";
                    values = [newUserPW, newUserPW, userName];
                    requestEditAccount(query, values);
                }
                else {
                    console.log("Wrong password. Aborting request.");
                    res.sendStatus(403);
                }
            });
        }
        else {
            console.log("Unknown type:",type,". Aborting request.")
            res.sendStatus(500);
        }
        
    })
    .delete(function(req, res) {    // user wants to delete their account
        let userName = req.query.user;
        let password = req.query.password;
        let query = "";
        let values = [];
        console.log("User",userName,"requests to delete their account ...");
        con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ? AND password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))) AS "matching_pw"', [userName, password, password],
            function (err, result) {
                if (err) throw err;
                if (result[0]['matching_pw']) {
                    function requestDeleteAccount() {
                        con.query(query, values,
                            function(err, result, fields) {
                                if (err) throw err;
                                console.log('Successfully deleted user account and',(result.affectedRows-1),'graph(s) with it. Closing request.');
                                res.sendStatus(200);
                        });
                    }
                    function getGraphCount(callback) {
                        con.query('SELECT COUNT(graphObject) AS "graph_count" FROM cytographs WHERE userName = ?', [userName],
                            function (err, result) {
                                if (err) throw err;
                                console.log("graph_count:",result[0]["graph_count"])
                                callback(result[0]["graph_count"]);
                        });
                    }
                    getGraphCount(function(graphCount) {
                        if(graphCount > 0) {
                            query = "DELETE u, c FROM userreg u, cytographs c WHERE (u.userName = ? AND u.password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))) AND c.userName = ?";
                            values = [userName, password, password, userName];
                        }
                        else {
                            query = "DELETE FROM userreg WHERE userName = ? AND password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))";
                            values = [userName, password, password];
                        }
                        requestDeleteAccount(query, values);
                    });
                }
                else {
                  console.log("Wrong password. Aborting request.");
                  res.sendStatus(403);
                }
        });
    });

//(graph)
router.route('/graph')
    //post a graph
    .post(function(req,res) {
        console.log('Attempting to post a graph with filename:',req.body.filename);
        //all information needed for creating a new entry, read from request body
        let post = {
            fileName: req.body.name, 
            userName: req.body.user, 
            graphObject: req.body.json
        };
        //check if graph already exists to prevent duplicate key error
        con.query('SELECT EXISTS(SELECT * FROM cytographs WHERE fileName = ? AND userName = ?) AS "graph_exists"', [post.fileName, post.userName],
            function (err, result) {
                if (err) throw err;
                if (result[0]['graph_exists']) res.sendStatus(403); // graph already exists -> send status Forbidden
                else {
                    // graph doesn't exist -> post allowed
                    con.query("INSERT INTO cytographs SET ?", post, // query syntax makes safe string escapes, (protection against injections)
                        function(err, result, fields) {
                            if (err) throw err;
                            console.log("Post was succesfull.");
                            res.sendStatus(200); //status 200 = "Succesful"
                    });
                }
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
        function requestMeta(query, values) {
            con.query(query, values, function(err, result, fields) {
                if (err) throw err;
                console.log("Successfully received metadata. Sending to client.");
                res.send(result);
            });
        }
        console.log('Requesting metadata ...');
        if (userRole === 'admin') {
            query = 'SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs';
            requestMeta(query, values);
        }
        else if (userRole === 'student') {
            query = 'SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs WHERE userName = ?';
            values = [userName];
            requestMeta(query, values);
        }
        else {
            console.log('Insufficient rights. Aborting request.')
            res.sendStatus(403);
        }
    });

//everytime a call to the api is made with the structure /graph/:file_name,
//this code will be called.
//It makes sure that the specified graph exists in the database
router.param('file_name', function(req, res, next, fileName)   {
    //check if Graph with fileName+userName exists within database
    let userRole = (req.query.role ? req.query.role : req.body.role);
    let userName = '';
    function requestGraphExistence() {
        console.log("Checking Database for graph ...");
        con.query("SELECT EXISTS(SELECT * FROM cytographs WHERE BINARY fileName = ? AND userName = ?) AS \"graph_exists\"", [fileName, userName], 
            function(err, result, fields) {
                if(err) throw err;
                if(result[0]["graph_exists"]) {
                    console.log("Found graph in Database. Continuing with request ...");
                    //next - route will continue normally
                    next();
                }
                else {
                    console.log("Could not find graph in Database. Aborting request.");
                    //route will not continue and send status Not Found
                    res.sendStatus(404);
                }
        });
    }
    if (userRole === 'admin') {
        userName = (req.query.author ? req.query.author : req.body.author);
        requestGraphExistence();
    }
    else if (userRole === 'student') {
        userName = (req.query.user ? req.query.user : req.body.user);
        requestGraphExistence();
    }
    else {
        console.log('Insufficient rights. Aborting request.');
        res.sendStatus(403);
    }    
});

router.route('/graph/:file_name')
    //get a single graph identified by fileName+userName
    .get(function(req, res) {
        let fileName = req.params.file_name;
        let userRole = req.query.role;
        let userName = '';
        function requestGraph() {
            con.query("SELECT graphObject FROM cytographs WHERE BINARY fileName = ? AND userName = ?", [fileName, userName], 
                function(err, result, fields) { 
                    if (err) throw err;
                    console.log("Successfully received graph. Sending to client.");
                    res.send(result);
            });
        }
        console.log("Requesting graph from Database ...");
        if (userRole === 'admin') {
            userName = req.query.author;
            requestGraph();
        }
        else if (userRole === 'student') {
            userName = req.query.user;
            requestGraph();
        }
        else {
            console.log('Insufficient rights. Aborting request.');
            res.sendStatus(403);
        }
        
    })
    //update a single graph identified by fileName+userName
    .put(function(req, res) {
        let put = {
            graphObject: req.body.json,
            fileName: req.params.file_name,
            userName: req.body.user
        }
        console.log('Requesting overwrite on graph in Database ...');
        con.query("UPDATE cytographs SET graphObject = ? WHERE BINARY fileName = ? AND userName = ?", [put.graphObject, put.fileName, put.userName],
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
        function requestDeleteGraph() {
            con.query("DELETE FROM cytographs WHERE BINARY fileName = ? AND userName = ?", [fileName, userName],
                function(err, result, fields)   {
                    if (err) throw err;
                    console.log('Successfully deleted graph. Closing request.');
                    res.sendStatus(200);
            });
        }
        console.log("Requesting deletion of graph from Database ...");
        if (userRole === 'admin') {
            userName = req.query.author;
            requestDeleteGraph();
        }
        else if (userRole === 'student') {
            userName = req.query.user;
            requestDeleteGraph();
        }
        else {
            console.log('Insufficient rights. Aborting request.');
            res.sendStatus(403);
        }
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