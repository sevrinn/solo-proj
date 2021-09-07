import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";

const CreateBand = (props) => {
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
      .post("http://localhost:8000/api/bands", newBand)
      .then((res) => {
        console.log(res);
        navigate("/bands/" + res.data._id);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.errors);
        //err.respoonse is the body that you get in Postman
        if (err.response.data.errors) {
          //save the errors in state to display
          setErrors(err.response.data.errors);
        }
      });
  };
  return (
    <div className="bg-purple-200 p-10 mt-10 rounded-xl">
      <h2>Create Band</h2>
      <form onSubmit={handleSubmit}>
        <label>Band Name:</label>
        {errors.bandName ? <span>{errors.bandName.message}</span> : null}
        <input
          type="text"
          name="bandName"
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
        />
        <label>Genre:</label>

        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label>About:</label>
        {errors.description ? <span>{errors.description.message}</span> : null}
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBand;
