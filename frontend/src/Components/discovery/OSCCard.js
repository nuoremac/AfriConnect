// src/components/discovery/OSCCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OSCCard = ({ osc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${osc.id}`);
  };

  const handleCardHover = (hovering) => {
    setIsHovered(hovering);
  };

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
        {osc.percentage}%
      </div>

      {/* En-tête de la carte */}
      <div style={styles.cardHeader}>
        <div style={styles.cardAvatar}>
          {osc.initials}
        </div>
        <div style={styles.cardInfo}>
          <h3 style={styles.cardTitle}>{osc.name}</h3>
          <div style={styles.cardLocation}>
            {osc.country || osc.location || '-'}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={styles.cardDescription}>
        {osc.mission || osc.description || '-'}
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
          onClick={() => navigate(`/collaborate/${osc.id}`)}
        >
          Requête de collaboration
        </button>
      </div>
    </div>
  );
};

// STYLES inchangés sauf cardAvatar pour centrer et arrondir correctement
const styles = {
  card: {
    background: 'white',
    border: '1px solid #e4e6ea',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  cardHovered: {
    transform: 'translateY(-3px)',
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
    background: '#f0f2f5',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1877f2',
    fontWeight: '700',
    fontSize: '18px',
  },
  cardInfo: { flex: 1 },
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
    background: '#1877f2',
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
    color: '#ff6900',
    border: '2px solid #ff6900',
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
