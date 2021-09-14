//import controller
const BandController = require("../controllers/band.controller");
const { authenticate } = require("../config/jwt.config");
//create routes func, within which will reside the routes
module.exports = (app) => {
  //get all bands
  app.get("/api/bands", BandController.getAll);
  //create band
  app.post("/api/bands", authenticate, BandController.create);
  //get one band
  app.get("/api/bands/:id", BandController.getOne);
  //update a band
  app.put("/api/bands/:id", BandController.update);
  //delete a band
  app.delete("/api/bands/:id", BandController.delete);
};
