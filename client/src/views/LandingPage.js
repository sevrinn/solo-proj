import React from "react";
import { Link, navigate } from "@reach/router";
import "../App.css";
import axios from "axios";
import Login from "../components/Login";
import purpleStage from '../images/purpleStage.jpg'




const LandingPage = (props) => {
  
  return (
    <div className="flex flex-col  p-5">
      
      
      <div className="h-48 w-full">
        <img className="h-48 object-cover object-bottom" src={purpleStage} alt="a purple foggy stage" />
      </div>
      
      
      <div>
        <Login />
      </div>
      
    </div>
  );
};

export default LandingPage;
