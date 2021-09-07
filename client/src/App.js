import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import AllBands from "./components/AllBands";
import CreateBand from "./components/CreateBand";
// import DeleteBand from "./components/DeleteBand";
import EditBand from "./components/EditBand";
import BandDetails from "./components/BandDetails";
import Header from "./views/Header";
// import DeleteBand from "./components/DeleteBand";

function App() {
  return (
    <div className="p-5 h-screen flex items-start justify-center md:container items-center flex-col">
      <Header />
      <Router>
        <AllBands default path="/bands" />
        <CreateBand path="/bands/new" />
        <BandDetails path="/bands/:id" />
        <EditBand path="/bands/:id/edit" />
      </Router>
    </div>
  );
}

export default App;
