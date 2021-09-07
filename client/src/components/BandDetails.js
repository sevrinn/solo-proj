import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";

const BandDetails = (props) => {
  const { id } = props;
  const [band, setBand] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bands/" + id)
      .then((res) => {
        console.log(res);
        setBand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-purple-200 p-10 h-screen flex justify-center items-start flex-col">
      <h2>Band Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Band Name: </td>
            <td>{band.bandName}</td>
          </tr>
          <tr>
            <td>Genre: </td>
            <td>{band.genre}</td>
          </tr>
          <tr>
            <td>About: </td>
            <td>{band.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BandDetails;
