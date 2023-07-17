import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Spots from "./pages/Spots";
import PlanYourVisit from "./pages/PlanYourVisit";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Spots" element={<Spots />} />
          <Route path="/plan-your-vist" element={<PlanYourVisit />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
