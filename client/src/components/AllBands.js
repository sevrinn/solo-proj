import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";
import DeleteBand from "./DeleteBand";
import Header from "./Header";
import io from 'socket.io-client';

const AllBands = (props) => {
  const [allBands, setAllBands] = useState([]);
  //save our socket connection in state so taht i stays connected
  // until we leave or refresh the page
  const [socket, setSocket] = useState(()=> io(":8000"));

  useEffect(() => {
    console.log("inside use effect for socket io");
    socket.on("connect",() => {
      console.log(`Connected on the client - ID: ${socket.id}`)
    })
    socket.on("new_band_added", (data) => {
      console.log("new_band_added");
      console.log(data);
      //update state to include new band object
      // add new band to top of list
      let updatedBandArr = [ data, ...allBands]
      setAllBands(updatedBandArr);
    } )
  },[])

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

  //remove the restaurant object from our array AFTER it is successfully deleted from backend server/ mongoDB
  const updateAfterDelete = (deletedBandId) => {
    let filteredBandArray = allBands.filter((bandObj) => {
      //if we return true, then obj becomes part of new array
      //if we return false object is skipped in then new array
      return bandObj._id !== deletedBandId;
    })
    setAllBands(filteredBandArray);
  }
  return (
    <div>
    <Header />
      <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold text-center">Your Bands</h2>
      
        
        
      
      {allBands.map((band, index) => (
        <div key={index} className="flex">
          <Link className="underline text-purple-900 text-lg font-medium" to={"/bands/" + band._id}>
            {band.bandName}
          </Link> 
          <DeleteBand bandId={band._id} afterDelete={updateAfterDelete}/>
          <br />
          {
            band.createdBy ?
              <p>Created by: {band.createdBy.username}</p>
              : null
          }
          
        </div>
      ))}
      
    </div>
    </div>
    
  );
};

export default AllBands;
