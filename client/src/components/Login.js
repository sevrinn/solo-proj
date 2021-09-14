import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/login", {
      email: email,
      password: password,
    },
    {
      //this iwll force sending of credentias/ cookies 
      withCredentials: true
    })
    .then((res)=> {
      console.log(res.cookie);
      console.log(res);
      console.log(res.data, 'is res data!');
      navigate("/bands");
    })
    .catch((err)=> {
      console.log(err.response);
      setErrors(err.response.data.message);
    });
  };

  return(
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl flex flex-col align-center">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Login</h2>
      <form className="flex flex-col" onSubmit={login}>
        <label className="text-purple-900 text-lg font-medium">Email:</label>
        {errors.email ? <span>{errors.email.message}</span> : null}
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-purple-900 text-lg font-medium">Password:</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
        
        <div className="flex align-center">
          <button className="text-purple-900 text-lg font-medium text-center bg-gradient-to-b from-purple-300 to-purple-400 shadow-lg p-3 mt-5 rounded-xl flex flex-col align-center justify-center w-full" type="submit">Sign In</button>
        </div>
        <p>Not a member yet? Register <Link to={"/register/"}>HERE</Link></p>
      </form>
    </div>
  );

};

export default Login;