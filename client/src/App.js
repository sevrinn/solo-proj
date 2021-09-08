import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import AllBands from "./components/AllBands";
import CreateBand from "./components/CreateBand";
// import DeleteBand from "./components/DeleteBand";
import EditBand from "./components/EditBand";
import BandDetails from "./components/BandDetails";
import Header from "./components/Header";
// import DeleteBand from "./components/DeleteBand";

function App() {
  return (
    <div className="p-5 h-screen flex items-start justify-center md:container items-center flex-col">
    <h1 className="text-purple-900 text-4xl font-extrabold">Musicians App</h1>
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
