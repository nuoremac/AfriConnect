// src/components/discovery/OSCCard.js
import React, { useState } from 'react';

const OSCCard = ({ osc }) => {

  // STATE - données internes du composant
  const [isHovered, setIsHovered] = useState(false);

  // EVENTS - actions utilisateur
  const handleViewProfile = () => {
    console.log(`Voir profil de ${osc.name}`);
    // Logique pour voir le profil
  };

  const handleSendRequest = () => {
    console.log(`Envoyer requête à ${osc.name}`);
    // Logique pour envoyer une requête
  };

  const handleCardHover = (hovering) => {
    setIsHovered(hovering);
  };

  // RENDER - JSX du composant
  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHovered : {})
      }}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
    >
      {/* Badge de score de matching */}
      <div style={styles.matchBadge}>
        {osc.matchScore}%
      </div>

      {/* En-tête de la carte */}
      <div style={styles.cardHeader}>
        <div style={styles.cardAvatar}>
          {osc.avatar}
        </div>
        <div style={styles.cardInfo}>
          <h3 style={styles.cardTitle}>{osc.name}</h3>
          <div style={styles.cardLocation}>
             {osc.location}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={styles.cardDescription}>
        {osc.description}
      </div>

      {/* Tags des secteurs */}
      <div style={styles.tags}>
        {osc.focus_areas.map((area, index) => (
          <span 
            key={index} 
            style={{
              ...styles.tag,
              ...(index % 2 === 0 ? styles.tagBlue : styles.tagOrange)
            }}
          >
            {area}
          </span>
        ))}
      </div>

      {/* Boutons d'action */}
      <div style={styles.cardActions}>
        <button 
          style={styles.btnPrimary}
          onClick={handleViewProfile}
        >
           Voir profil
        </button>
        <button 
          style={styles.btnOutlineSecondary}
          onClick={handleSendRequest}
        >
           Requête
        </button>
      </div>
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  card: {
    background: 'white',
    border: '1px solid #e4e6ea',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  },

  cardHovered: {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderColor: '#1877f2'
  },

  matchBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#42b883',
    color: 'white',
    padding: '6px 10px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(66, 184, 131, 0.3)'
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    marginTop: '10px'
  },

  cardAvatar: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #1877f2, #ff6900)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '18px',
    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
  },

  cardInfo: {
    flex: 1
  },

  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1c1e21',
    margin: '0 0 4px 0'
  },

  cardLocation: {
    color: '#65676b',
    fontSize: '14px'
  },

  cardDescription: {
    color: '#65676b',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '15px'
  },

  tags: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },

  tag: {
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },

  tagBlue: {
    background: '#e7f3ff',
    color: '#1877f2'
  },

  tagOrange: {
    background: '#fff3e0',
    color: '#ff6900'
  },

  cardActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },

  btnPrimary: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: '#1877f2', // Bleu Facebook
    color: 'white',
    boxShadow: '0 2px 8px rgba(24, 119, 242, 0.3)',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
  },

  btnOutlineSecondary: {
    padding: '10px 16px',
    background: 'transparent',
    color: '#ff6900', // Orange
    border: '2px solid #ff6900', // Orange
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
  }
};

export default OSCCard;