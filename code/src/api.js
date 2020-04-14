/* eslint-disable no-console */
//Node.js setup for interface between front and backend

//uses express module 
const express = require('express');

//api is the object variable to access the express functionality
const api = express();

//3000 is the port number -> probably needs to change
api.listen(8080, () => {
    console.log('API success');
});

//When accessing the root ('/') of the site (the localhost:3000)
//a get request is send. The api will intercept and and do
//the stuff defined here (req is the request, res is the response)
//req gives you a lot of information about the request
api.get('/home/login', (req, res) => {
    console.log(req);
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
});