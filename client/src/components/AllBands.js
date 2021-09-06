import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <div>
      <h2>All Bands</h2>
      {allBands.map((band, index) => (
        <div key={index}>{band.bandName}</div>
      ))}
    </div>
  );
};

export default AllBands;
