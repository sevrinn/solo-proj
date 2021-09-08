import React from "react";
import { Link } from "@reach/router";
import "../App.css";

const Header = (props) => {
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
      </div>

    </div>
  );
};

export default Header;
