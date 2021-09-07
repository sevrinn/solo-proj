import React from "react";
import { Link } from "@reach/router";
import "../App.css";

const Header = () => {
  return (
    <div className="flex items-center flex-wrap md:container justify-center">
      <h1 className="text-purple-900">Musicians App</h1>

      <div className="ml-10">
        <Link
          className="p-3 ml-5 hover:bg-purple-200 rounded-xl"
          to={"/bands/"}
        >
          Bands
        </Link>
        <Link
          className="p-3 ml-5 hover:bg-purple-200 rounded-xl"
          to={"/bands/"}
        >
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Header;
