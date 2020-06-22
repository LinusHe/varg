/* eslint-disable no-console */
//Node.js setup for interface between front and backend

//uses express module and mysqljs
const express = require("express");
const mysql_driver = require("mysql");
var fs = require("fs");
var https = require("https");

//config object holds information for database access
const config = {
  // eheldt: 192.168.99.101
  // jhohlfel: 192.168.99.101
  //host => adress of database server
  host: "localhost",
  //user that accesses the database
  user: "root",
  //password to be used (has to match database password)
  password: "VarG2020",
  //which database on the server to access
  database: "vargdb",
};

//MySQL Driver configuration
const con = mysql_driver.createConnection(config);

//Node connects to DB, test
con.connect(function (err) {
  //if an error occures during connection handle it here
  if (err) {
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
router.use(function (req, res, next) {
  console.log("middleware could happen here");

  //this will allow to (only) access the resources from the specified address
  res.header("Access-Control-Allow-Origin", "https://sam.imn.htwk-leipzig.de");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next(); //continue past middleware
});

//test route ('/' = root)
router.get("/", (req, res) => {
  res.json({ message: "api is responsive" });
});

//any additional routes here

//parser for body information in post requests
let bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//login
router
  .route("/login?")
  //catch the login-Request
  .post(function (req, res) {
    console.log("Sending Log-In data.");
    //access the information send in the request body
    let userName = req.body.user;
    let password = req.body.password;
    console.log(userName + ", " + password);
    //universal password for all users - no specification of user
    //if we had a user database, we could log them into their accounts here
    if (password === "2020") {
      console.log(userName + ", willkommen in der Matrix.");
      //account information
      let user = {
        name: userName,
        role: "student",
        issued: Date.now(),
        //lets the client know that login was succesfull
        authenticated: true,
      };
      //Sends user object back to client
      res.send(user);
    }
    //error 403 = "forbidden"
    else res.sendStatus(403);
  });

//(graph)
router
  .route("/graph?")
  //get all graphs - should probably be reserved to higher authority roles
  .get(function (req, res) {
    console.log("Sending all Graphs");
    //Queries the databse with SQL Query
    con.query("SELECT graphObject FROM cytographs", function (err, result) {
      if (err) throw err;
      console.log("Query was successful !");
      res.send(result);
    });
  })
  //post a graph
  .post(function (req, res) {
    console.log("Attempting to post a graph with filename:", req.body.filename);
    //all information needed for creating a new entry, read from request body
    let post = { fileName: req.body.name, userName: req.body.user, graphObject: req.body.json };
    //query syntax makes safe string escapes, (protection against injections)
    con.query("INSERT INTO cytographs SET ?", post, function (err, result, fields) {
      if (err) throw err;
      console.log("Post was succesfull.");
      //status 201 = "Succesful"
      res.sendStatus(201);
    });
  });

//does it work ?
//get metadata of all graphs from specified user
router.route("/graph/meta").get(function (req, res) {
  console.log("Sending all metadata of user:", req.query.user);
  let userName = req.query.user;
  //string escape syntax
  con.query('SELECT JSON_EXTRACT(graphObject,"$.data") AS "metadata", fileName, userName FROM cytographs WHERE userName = ?', [userName], function (err, result, fields) {
    if (err) throw err;
    console.log("Query was successful !");
    res.send(result);
  });
});

//graph/:graph_id

//everytime a call to the api is made with the structure /graph/:file_name,
//this code will be called.
//It makes sure that the specified graph exists in the database

router.param("file_name", function (req, res, next, fileName) {
  //check if Graph with id exists within database
  let userName = req.query.user;
  console.log("Checking Database for Graph");
  con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], function (err, result, fields) {
    if (err) {
      //connection issues may exist and the graph could still be in the db
      console.log("Graph may not exist.");
      //route will not continue nad throw an error
      throw err;
    } else {
      console.log("Graph does exist.");
      //next - route will continue normally
      next();
    }
  });
});

router
  .route("/graph/:file_name?")
  //get a single graph identified by id
  .get(function (req, res) {
    //user can only access the graphs under his username
    let fileName = req.params.file_name;
    let userName = req.query.user;
    console.log("Sending Graph with id:", fileName, ", username:", userName);
    con.query("SELECT graphObject FROM cytographs WHERE fileName = ? AND userName = ?", [fileName, userName], function (err, result, fields) {
      if (err) throw err;
      console.log("Get-Query was successful!");
      res.send(result);
    });
  })
  //update a single graph identified by id
  .put(function (req, res) {
    console.log("Updating Graph");
    let put = {
      graphObject: req.body.json,
      fileName: req.params.file_name,
      userName: req.body.user,
    };
    con.query("UPDATE cytographs SET graphObject = ? WHERE fileName = ? AND userName = ?", [put.graphObject, put.fileName, put.userName], function (err, result, fields) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.sendStatus(200);
    });
  })
  //delete a single graph identified by id
  .delete(function (req, res) {
    let fileName = req.params.file_name;
    let userName = req.query.user;
    console.log("Deleting Graph");
    con.query("DELETE FROM cytographs WHERE fileName = ? AND userName= ?", [fileName, userName], function (err, result, fields) {
      if (err) throw err;
      console.log("Delete-Query succesfull");
      res.send(result);
    });
  });

//route for testing purposes - remove in build
router
  .route("/test")

  .get(function (req, res) {})
  .post(function (req, res) {})
  .put(function (req, res) {})
  .delete(function (req, res) {});

//---------------------

//REGISTER routes

//prefix any routes with /VarG
api.use("/VarG", router);

//---------------------

//START the server
https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/sam.imn.htwk-leipzig.de/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/sam.imn.htwk-leipzig.de/cert.pem"),
    },
    api
  )
  .listen(7070);
