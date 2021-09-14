//start loading with the .env file
//this way we can use it everywhere in our server
require("dotenv").config();
//import express and other libraries
const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const socketio = require('socket.io');
//declare port (which is stored in the .env file)
const port = process.env.PORT;

//configure express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add cors/ ability to use credentials with cookies
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
//configure server to accept and update cookies
app.use(cookieParser());
//configure mongoose to connect
require("./config/mongoose.config");
//add routes to listen
const bandRoutes = require("./routes/band.routes")(app);

const userRoutes = require("./routes/user.routes")(app);


//set server listening
const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['*'] //this will allow all configurations of headers
  }
})

// 2 keywords to foucs on when using socketio
//    on - this means we are listening
//    emit - this is us speaking / sending
io.on("connection",(socket) => {
  // socket is an object that contains info to uniquely identify a client
  console.log(`Server side socket id: ${socket.id}`);

  //ALL listening must happen inside of my io.on function
  //  from here on, we will use the socket object
  socket.on("added_new_band", (data) => {
      console.log("in added_new_movie");
      console.log(data);
      socket.broadcast.emit("new_band_added");
  })
})
