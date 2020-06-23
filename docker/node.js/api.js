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

//login
router.route('/login?')
    //catch the login-Request
    .post(function (req, res) {
        console.log("Sending Log-In data.");
        //access the information send in the request body
        let userName = req.body.user;
        let password = req.body.password;
        console.log(userName + ", " + password);
        //admin login
        if (userName === "admin"){
            if (password === "VarG2020") {
                let user = {
                    name: userName,
                    role: 'admin',
                    issued: Date.now(),
                    authenticated: true
                }
                res.send(user);
            }
            else { res.sendStatus(403); }
        }
        //student login
        else {
            con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ?) as "user_exists"', [userName], 
            function(err, result, fields) { 
                if (err) throw err;
                console.log("Checking if user exists...");
                if (result[0]['user_exists']) {
                    con.query('SELECT EXISTS(SELECT * FROM userreg WHERE userName = ? AND password = ?) as "matching_pw"', [userName, password],
                    function (err, result) {
                        if (err) throw err;
                        console.log("User exists. Checking if password matches...");
                        if (result[0]['matching_pw']) {
                            console.log("Correct password. Logging in existing user",userName,"...");
                            //account information
                            let user = {
                                name: userName,
                                role: 'student',
                                issued: Date.now(),
                                //lets the client know that login was succesfull
                                authenticated: true
                            }
                            //Sends user object back to client
                            res.send(user);
                        }
                        else {
                            console.log("Wrong password. Invalid Login.");
                            //error 403 = "forbidden"
                            res.sendStatus(403); //entered existing user with wrong password
                        }
                    });
                }
                else {
                    console.log("User doesn't exist. Creating new account...");
                    account = {
                        userName: userName,
                        password: password
                    }
                    con.query("INSERT INTO userreg SET ?", account,
                    function(err, result, fields) {
                        if (err) throw err;
                        console.log("Successfully created new user account. Logging in new user",userName,"...");
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
            
        }
        //error 403 = "forbidden"
        //else res.sendStatus(403);
    });


//(graph)
router.route('/graph?')
    //post a graph
    .post(function(req,res) {
        console.log('Attempting to post a graph with filename:',req.body.filename);
        //all information needed for creating a new entry, read from request body
        let post = {fileName: req.body.name, 
                    userName: req.body.user, 
                    graphObject: req.body.json};
        //query syntax makes safe string escapes, (protection against injections)
        con.query("INSERT INTO cytographs SET ?", post,
         function(err, result, fields) {
            if (err) throw err;
            console.log("Post was succesfull.");
            //status 201 = "Succesful"
            res.sendStatus(201);
        });
    });

//user=student can only access the graphs under their username
//user=admin can access all graphs in the DB

//get metadata of all graphs from specified user or from all users if user=admin
router.route('/graph/meta')
    .get(function (req, res) {
        let userName = req.query.user;
        if (userName === 'admin') {
            console.log('Sending all metadata for admin');
            con.query('SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs',
            function(err, result, fields) {
                if (err) throw err;
                console.log("Query was successful !");
                res.send(result);
            });
        }
        else {
            console.log('Sending all metadata of specified user:', userName);
            //string escape syntax
            con.query('SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs WHERE userName = ?', [userName],
            function(err, result, fields) {
                if (err) throw err;
                console.log("Query was successful !");
                res.send(result);
            });
        }
        
    });

//everytime a call to the api is made with the structure /graph/:file_name,
//this code will be called.
//It makes sure that the specified graph exists in the database
router.param('file_name', function(req, res, next, fileName)   {
    //check if Graph with fileName+userName exists within database
    let userName=req.query.user;
    console.log("Checking Database for Graph");
    if(userName === 'admin') {
        let author = req.query.author;
        con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, author], 
        function(err, result, fields) {
            if (err) {
                //connection issues may exist and the graph could still be in the db
                console.log("Graph may not exist.");
                //route will not continue nad throw an error
                throw err;
            }
            else{
                console.log("Graph does exist.");
                //next - route will continue normally
                next();
            }
        });
    }
    else {
        con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], 
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
    }
});

router.route('/graph/:file_name?')
    //get a single graph identified by fileName+userName
    .get(function(req, res) {
        let fileName=req.params.file_name;
        let userName=req.query.user;
        if(userName === 'admin') {
            let author = req.query.author;
            console.log('Sending Graph with fileName:', fileName, ', author:', author);
            con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, author], 
            function(err, result, fields) { 
                if (err) throw err;
                console.log("Get-Query was successful!");
                res.send(result);
            });
        }
        else {
            console.log('Sending Graph with fileName:',fileName,', userName:',userName);
            con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], 
            function(err, result, fields) { 
                if (err) throw err;
                console.log("Get-Query was successful!");
                res.send(result);
            });
        }
    })
    //update a single graph identified by fileName+userName
    .put(function(req, res) {
        let put = {
            graphObject: req.body.json,
            fileName: req.params.file_name,
            userName: req.body.user
        }
        console.log('Updating Graph with fileName:', put.fileName, ', userName:', put.userName);
        con.query("UPDATE cytographs SET graphObject = ? WHERE fileName = ? AND userName = ?",
        [put.graphObject, put.fileName, put.userName],
        function(err, result, fields) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.sendStatus(200);
        });
    })
    //delete a single graph identified by fileName+userName
    .delete(function(req, res) {
        let fileName = req.params.file_name;
        let userName = req.query.user;
        if (userName === 'admin') {
            let author = req.query.author;
            console.log('Deleting Graph with fileName:', fileName, ', author:', author);
            con.query("DELETE FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, author],
            function(err, result,fields)   {
                if (err) throw err;
                console.log("Delete-Query succesfull");
                res.send(result);
            });
        }
        else {
            console.log('Deleting Graph with fileName:', fileName, ', userName:', userName);
            con.query("DELETE FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName],
            function(err, result,fields)   {
                if (err) throw err;
                console.log("Delete-Query succesfull");
                res.send(result);
            });
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