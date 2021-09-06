//start loading with the .env file
//this way we can use it everywhere in our server
require("dotenv").config();
//import express and other libraries
const express = require("express");
const app = express();
const cors = require("cors");
//declare port (which is stored in the .env file)
const port = process.env.PORT;

//configure express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add cors/ ability to use credentials with cookies
app.use(
  cors({
    //add cookie credentials in here
  })
);
//configure server to accept and update cookies

//configure mongoose to connect

//add routes to listen
// const bandRoutes = require("./routes/band.routes");
// bandRoutes(app);
//set server listening
app.listen(port, () => {
  console.log("Listening on port " + port);
});
