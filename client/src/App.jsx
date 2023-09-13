//|| PAGES
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Storytelling from "./pages/Storytelling/Storytelling";
import About from "./pages/About/About";

//|| LIBRARY
import { HashRouter, Routes, Route } from "react-router-dom";

// || STYLE
import "./App.css";

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/storytelling" element={<Storytelling />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
