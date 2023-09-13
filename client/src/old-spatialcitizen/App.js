import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MapView from './components/Map/Map';
import GuideView from './components/Guide/Guide';
import AboutView from './components/About/About';
import DeckGLMap from './components/Map/mapbox-component/Coba/DeckGL';
// import Turf from './components/Map/mapbox-component/Coba/Turf';
import StorytellingMap from './components/Storytelling/StorytellingMap';

function App() {

  return (
    <div className='App'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/guide" element={<GuideView />} />
              <Route path="/about" element={<AboutView />} />
              <Route path="/deck" element={<DeckGLMap />} />
              {/* <Route path="/turf" element={<Turf />} /> */}
              <Route path="/storytelling" element={<StorytellingMap />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
