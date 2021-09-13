const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  //get all users
  app.get("/api/users", UserController.getAll);
   //register/create users
   app.post("/api/users/register", UserController.register);
   // app.post("/api/users/login", UserController.login);
   // app.post("/api/users/logout", UserController.logout);
  //get one user
  app.get("/api/users/:id", UserController.getOne);
  //update user
  app.put("/api/users/:id", UserController.update);
  //delete user
  app.delete("/api/users/:id", UserController.delete);
 

}