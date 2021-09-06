import { Router } from "@reach/router";
import AllBands from "./components/AllBands";
import CreateBand from "./components/CreateBand";
// import DeleteBand from "./components/DeleteBand";
import EditBand from "./components/EditBand";
import BandDetails from "./components/BandDetails";
import "./App.css";
import DeleteBand from "./components/DeleteBand";

function App() {
  return (
    <div className="App">
      <h1>Musicians App</h1>
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
