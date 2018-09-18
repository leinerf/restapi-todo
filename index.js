const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./models");
//routes
const authRoutes = require("./routes/auth")
const todoRoutes = require("./routes/todos");
//custom middleware
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

//to be able to parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//the routes you would use
app.use('/api/user/',authRoutes);
app.use('/api/user/:user_id/todos/', 
    loginRequired,
    ensureCorrectUser,
    todoRoutes);

//error handling
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
app.use(errorHandler);

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
})
    
    