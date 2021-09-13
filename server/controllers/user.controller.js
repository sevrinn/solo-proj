const User = require("../models/user.model");

module.exports = {
  register: (req, res) => {
    console.log("in register");
    console.log(req.body);

    //use the req data and the User model constructor to create a user object
    const user = new User(req.body);

    user.save()
    .then(newUser => {
      console.log(newUser);
      console.log("Successfully registered");
      res.json({msg: "success!", user: newUser});
    })
    .catch(err=> {
      console.log("register not successful", err);
      res.status(400).json(err);
    });
  },
  //login
  
}

//get All Users
module.exports.getAll = (req, res) => {
  console.log("inside of getAll");
  User.find()
    .then((allUsers) => {
      console.log(allUsers);
      res.json(allUsers);
    })
    .catch((err) => {
      console.log("There's been a problem finding all users!", err);
      res.json(err);
    });
};
//create users
module.exports.create = (req, res) => {
  console.log("inside of create");
  console.log(req.body);
  User.create(req.body)
    .then((newUser) => {
      console.log(newUser);
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//get one band
module.exports.getOne = (req, res) => {
  User.findById(req.params.id)
    .then((oneUser) => {
      console.log(oneUser);
      res.json(oneUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//update
module.exports.update = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//delete
module.exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      console.log(deletedUser);
      res.json(deletedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};



