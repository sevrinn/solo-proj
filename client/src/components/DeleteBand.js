import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const DeleteBand = (props) => {
  const { bandId, afterDelete } = props;

  const deleteHandler = () => {
    console.log("Delete id:" + bandId);

    axios.delete("http://localhost:8000/api/bands/" + bandId)
      .then((res)=> {
        console.log("band deleted: " +bandId)
        console.log(res.data)
        //run the specific code for after the delte is successful
        afterDelete(bandId);
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  return (
  <button onClick={(e)=>deleteHandler()}>
    Delete Band
  </button>);
};

export default DeleteBand;
