import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";
import Header from "./Header";
import io from 'socket.io-client';

const CreateBand = (props) => {
  //we will never change the socket state with the setter so,
  // we can leave it out
  const [socket] = useState(()=> io(":8000"));
  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBand = {
      bandName, //ES6 syntax
      genre: genre, //es5 syntax: key and value are both written out
      description,
    };
    axios
      .post("http://localhost:8000/api/bands", newBand,
      {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          //save the errors in state to display
          setErrors(res.data.errors);
        } else {
          //on success, we need to do 2 things
          //  1. notify server throught socket.io to share this new movie with other clients
          //  2. redirect (navigate) to the movie list
          socket.emit("added_new_band", res.data);
          //now that we are done with socket connection in this component, we must disconnect
          socket.disconnect();
          //  redirect
          navigate("/bands/" + res.data._id);
        }
        
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
          navigate('/login/');
        }
        // console.log(err.response.data.errors);
        // //err.respoonse is the body that you get in Postman
        // if (err.response.data.errors) {
        //   //save the errors in state to display
        //   setErrors(err.response.data.errors);
        // }
      });
  };
  return (
    <div>
    <Header />
      <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl flex flex-col align-center">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Create Band</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-purple-900 text-lg font-medium">Band Name:</label>
        {errors.bandName ? <span>{errors.bandName.message}</span> : null}
        <input
          type="text"
          name="bandName"
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
        />
        <label className="text-purple-900 text-lg font-medium">Genre:</label>

        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label className="text-purple-900 text-lg font-medium">About:</label>
        {errors.description ? (
          <span className="text-red-500">{errors.description.message}</span>
        ) : null}
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex align-center">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default CreateBand;
