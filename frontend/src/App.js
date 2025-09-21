import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import DiscoveryPage from "./Components/discovery/DiscoveryPage";
import ProfilePage from "./Components/profile/ProfilePage";

function App() {
  return (

    <div className="App"> 

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<DiscoveryPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>

      </div>

  );
}

export default App;