import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";
import BandDetails from "./BandDetails";

const AllBands = (props) => {
  const [allBands, setAllBands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bands")
      .then((res) => {
        console.log(res);
        setAllBands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Your Bands</h2>
      {
        //if allBands res.data.length is greater than 0, map the bands to the page
        //otherwise show this message?? i dont know if i can do this in time
      }
      {allBands.map((band, index) => (
        <div key={index}>
          <Link className="underline text-purple-900 text-lg font-medium" to={"/bands/" + band._id}>
            {band.bandName}
          </Link>
        </div>
      ))}
      
    </div>
  );
};

export default AllBands;
