// src/App.js

import React from 'react';
import ProfilePage from './components/ProfilePage/ProfilePage'; // Import your new component
import './App.css';

function App() {
  return (
    // Instead of the default 'Learn React' content, we render the ProfilePage
    <div className="App">
      <ProfilePage />
    </div>
  );
}

export default App;