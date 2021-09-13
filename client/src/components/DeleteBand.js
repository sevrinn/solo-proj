import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { TiDelete } from "react-icons/ti";


const DeleteBand = (props) => {
  const { bandId, afterDelete } = props;

  const deleteHandler = () => {
    console.log("Delete id:" + bandId);

    axios.delete("http://localhost:8000/api/bands/" + bandId)
      .then((res)=> {
        console.log("band deleted: " +bandId)
        console.log(res.data)
        //run the specific code for after the delete is successful
        afterDelete(bandId);
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  return (
  <button onClick={(e)=>deleteHandler()} className="flex items-center text-red-900">
    <TiDelete/> Delete
  </button>);
};

export default DeleteBand;
