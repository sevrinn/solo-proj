import React, {useState} from "react";
import axios from "axios";
import { navigate, useNavigate } from "@reach/router";

const RegisterUser = (props) => {
  // const [firstName, setFirstName] = useState("");
  // const [fnErrors, setFnErrors] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [lnErrors, setLnErrors] = useState("");
  // const [username, setUsername] = useState("");
  // const [unErrors, setUnErrors] = useState("");
  // const [email, setEmail] = useState("");
  // const [emErrors, setEmErrors] = useState("");
  // const [password, setPassword] = useState("");
  // const [pwErrors, setPwErrors] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [cpwErrors, setCpwErrors] = useState("");
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});
  const[user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // use single function to update the state object
  //using the inputs name attr as the key to obj value
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  
 
  

  const register = (e) => {
    e.preventDefault();
    //   const newUser = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   username: username,
    //   email: email,
    //   password: password,
    // }
    axios.post("http://localhost:8000/api/users/register",
    user,     //user state is already an object with the correct key/values
    {
      //this will force the sending of credentials / cookies os they can be updated
      withCredentials: true,
    })
    .then((res)=> {
      console.log(res.data);
      //when we successfully created the account, reset state for registration form
      //we do this only if we are NOT navigating immediately to another page
      setUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setConfirmReg("Thanks for registering, you can now log in!");
      setErrors({}); //remember to reset errors state if it was successful
    })
    .catch((err)=> {
      console.log(err);
      console.log(err.response.data);
      console.log(err.response.data.errors);
      if (err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    });
  };

  return(
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl flex flex-col align-center">
    <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Register</h2>
      <form className="flex flex-col" onSubmit={register}>
      
        <label className="text-purple-900 text-lg font-medium">First Name:</label>
        {
          confirmReg ?
          <h4 className="text-green-600 text-sm">{confirmReg}</h4>
          : null
        }
        <input 
        type="text" 
        name="firstName"
        value={user.firstName}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.firstName ? <span className ="text-red-500">{errors.firstName.message}</span>
          : null
        }
      
        <label className="text-purple-900 text-lg font-medium">Last Name:</label>
        <input 
        type="text" 
        name="lastName"
        value={user.lastName}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.lastName ? <span className ="text-red-500">{errors.lastName.message}</span>
          : null
        }
      
        <label className="text-purple-900 text-lg font-medium">Username:</label>
        <input 
        type="text" 
        name="username"
        value={user.username}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.username ? <span className ="text-red-500">{errors.username.message}</span>
          : null
        }
      
        <label className="text-purple-900 text-lg font-medium">Email:</label>
        <input 
        type="text" 
        name="email"
        value={user.email}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.email ? <span className ="text-red-500">{errors.email.message}</span>
          : null
        }
      
        <label className="text-purple-900 text-lg font-medium">Password:</label>
        <input 
        type="password" 
        name="password"
        value={user.password}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.password ? <span className ="text-red-500">{errors.password.message}</span>
          : null
        }
      
        <label className="text-purple-900 text-lg font-medium">Confirm Password:</label>
        <input 
        type="password" 
        name="confirmPassword"
        value={user.confirmPassword}
        onChange={(e) => handleChange(e)}
        />
        {
          errors.confirmPassword ? <span className ="text-red-500">{errors.confirmPassword.message}</span>
          : null
        }
      <button className="p-2 mt-3 bg-gradient-to-b from-purple-300 to-purple-400 text-purple-900 rounded-xl" type="submit">Register</button>
    </form>
    </div>
    
  );
}

export default RegisterUser;