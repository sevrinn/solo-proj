mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  username: {
    type:String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"]
  },
}, {timestamps: true});

//virtual field for confirm password
UserSchema.virtual("confirmPassword")
.get(()=>this._confirmPassword)
.set((value)=>(this._confirmPassword = value));

//middleware jumps into middle of process, does some work, 
// and continues with next step as if there had been no interruption
//IMPORTANT! cannot use arrow function because it doesnt have the scope for 'this'
UserSchema.pre("validate", function (next) {
  console.log("inside pre validate");
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  
  console.log("inside pre-save");
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log("Error while hashing the password");
    });
});

module.exports = mongoose.model("User", UserSchema);