import React from "react";
import { Link, navigate } from "@reach/router";
import "../App.css";
import axios from "axios";



const Header = (props) => {
  const logout = (e)=> {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/logout", {
      //no body required of rthis requiest
    }, {
      withCredentials: true,
    })
    .then((res)=> {
      console.log(res.data);
      navigate("/register");
    })
    .catch(err=> {
      console.log(err);
    });
  };
  return (
    <div className="flex p-10">
      
      <div className="flex">
        <Link
          className="p-3 mx-2 bg-gradient-to-b from-purple-100 to-purple-200 text-purple-900 rounded-xl"
          to={"/bands/new"}
        >
          Create Band
        </Link>
        <Link
          className="p-3 bg-gradient-to-b from-purple-100 to-purple-200 text-purple-900 rounded-xl"
          to={"/bands/"}
        >
          Home
        </Link>
        <button className="p-3 mx-2 bg-gradient-to-b from-purple-300 to-purple-400 text-purple-900 rounded-xl" onClick={(e)=>logout(e)}>Logout</button>
      </div>

    </div>
  );
};

export default Header;
