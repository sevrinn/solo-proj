import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, navigate } from "@reach/router";

const EditBand = (props) => {
  const { id } = props;
  const [bandName, setBandName] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    axios
    .get("http://localhost:8000/api/bands/" + id)
    .then((res) => {
      console.log(res.data);
      setBandName(res.data.bandName);
      setGenre(res.data.genre);
      setDescription(res.data.description);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempBand = {
      bandName, //ES6 syntax
      genre: genre, //es5 syntax: key and value are both written out
      description,
    };

    axios
      .put("http://localhost:8000/api/bands/" + id, tempBand)
      .then((res) => {
        console.log(res);
        console.log("inside then of axios put")
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
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg p-10 mt-10 rounded-xl flex flex-col align-center">
      <h2 className="mb-5 text-purple-900 text-3xl font-extrabold">Create Band</h2>
      <form className="flex flex-col">
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
        
      </form>
      <div className="flex align-center">
          <button onClick={handleSubmit}>Update</button>
        </div>
    </div>
  );
};

export default EditBand;
