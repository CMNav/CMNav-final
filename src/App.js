import "./App.css";
import { HashRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Spots from "./pages/Spots";
import PlanYourVisit from "./pages/PlanYourVisit";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes basename="/index.html">
          <Route path="/*" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Spots" element={<Spots />} />
          <Route path="/plan-your-vist" element={<PlanYourVisit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
