import React from 'react';
import './ProfilePage.css';

// Mock data to be used until the backend is integrated.
// This allows you to focus on the design and layout independently.
const mockOSCData = {
  name: "Community Development Initiative",
  mission: "Empowering local communities through education, health, and sustainable economic development.",
  country: "Cameroon",
  focus_areas: [
    "Education",
    "Public Health",
    "Economic Development",
    "Women's Empowerment"
  ],
};

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-name">{mockOSCData.name}</h1>
        <p className="profile-mission">{mockOSCData.mission}</p>
      </header>

      <main className="profile-main">
        {/* Section: Country and Focus Areas */}
        <section className="profile-section">
          <h2 className="section-title">Key Information</h2>
          <div className="info-grid">
            <div>
              <p className="info-label">Country</p>
              <p className="info-value">{mockOSCData.country}</p>
            </div>
            <div>
              <p className="info-label">Focus Areas</p>
              <div className="focus-areas-tags">
                {mockOSCData.focus_areas.map((area, index) => (
                  <span key={index} className="tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
