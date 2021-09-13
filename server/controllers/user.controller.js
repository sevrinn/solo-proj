const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //register/create user
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
  login: (req, res) => {
    User.findOne({email: req.body.email })
    .then((userRecord) => {
      if (userRecord == null) {
        console.log("email not found")
        res.status(400).json({ message: "Invalid Log in attempt"})
      } else {
        //email was found
        console.log("email was found");
        // compare the address given to us in the request with the one stored in the DB
        bcrypt.compare(req.body.password, userRecord.password)
          .then((isPasswordValid) => {
            if(isPasswordValid) {
              console.log("Password is valid");
              console.log(userRecord);
              console.log(process.env.SECRET_KEY);
              res.cookie("usertoken", //name of the cookie
                jwt.sign({
                  //payload is the data i want to save
                  user_id: userRecord._id,
                  email: userRecord.email,  
                },
                process.env.SECRET_KEY
                ), 
                {
                  // configuration settins for this cookie
                  httpOnly: true,
                  expires: new Date(Date.now() + 9000000),
                }
              )

                .json({
                  message: "Successfully logged in",
                  userLoggedIn: userRecord.username,
                })
              } else {
                //passwords didnt match
                console.log("pwds don match")
                res.status(400).json({ message: "pwds Invalid Log in attempt"})
              }
            })
            .catch((err) => {
              console.log("error with compare pwds")
              res.status(400).json({message: "pwds catchinvalid login attempt"});
            });
      }
    })
    .catch((err) => {
      console.log("error with find one")
      res.status(400).json({message: " findOne invalid login attempt "});
    });
  },
  //logout
  logout: (req, res) => {
    console.log("logging out!");
    res.clearCookie("usertoken"); //same as cookie above
    res.json({
      message:"You have successfully logged out",
    })
  }
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



