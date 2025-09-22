import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import DiscoveryPage from "./Components/discovery/DiscoveryPage";
import ProfilePage from "./Components/profile/ProfilePage";
import LandingPage from "./Components/Landing/LandingPage";
import LoginForm from "./Components/Form/LoginForm";
import CreateProfileForm from "./Components/Form/CreateProfileForm";
import CollaborationChat from "./Components/Form/CollaborationChat";
function App() {
  return (

    <div className="App"> 

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/discover" element={<DiscoveryPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />

              {/* Nouvelles routes pour les formulaires  */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/create-profile" element={<CreateProfileForm />} />
              {/* <Route path="/chat" element={<CollaborationChat />} /> */}
              <Route path="/collaborate/:oscId" element={<CollaborationChat />} />
            
        </Routes>
        </div>
      </Router>

      </div>

  );
}

export default App;