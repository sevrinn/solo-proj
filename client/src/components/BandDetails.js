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
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl flex flex-col">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Band Details</h2>
      <table className="text-purple-900 text-lg font-medium p-5">
        <tbody className="p-5">
          <tr className="p-5">
            <td className="font-bold pr-6">Band Name: </td>
            <td>{band.bandName}</td>
          </tr>
          <tr>
            <td className="font-bold">Genre: </td>
            <td>{band.genre}</td>
          </tr>
          <tr>
            <td className="font-bold">About: </td>
            <td>{band.description}</td>
          </tr>
          <tr>
            <td>
              {
                band.createdBy ?
                (
                  <div>
                    Created by: {band.createdBy.username}
                  </div>
                )
                : null
              } 
            </td>
            
          </tr>
        </tbody>
      </table>
      <button className="font-bold bg-purple-900 w-12 text-purple-200" onClick={(e)=> navigate(`/bands/${id}/edit`)}>Edit</button>
    </div>
  );
};

export default BandDetails;
