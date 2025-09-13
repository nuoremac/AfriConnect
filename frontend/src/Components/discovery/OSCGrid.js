// src/components/discovery/OSCGrid.js
import React, { useState } from 'react';
import OSCCard from './OSCCard';

const OSCGrid = ({ oscs, loading }) => {
  // STATE - état du composant
  const [sortBy, setSortBy] = useState('matchScore'); // tri par défaut

  // EVENTS - fonctions d'interaction
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Fonction pour trier les OSC
  const sortedOSCs = [...oscs].sort((a, b) => {
    switch (sortBy) {
      case 'matchScore':
        return b.matchScore - a.matchScore; // Décroissant
      case 'name':
        return a.name.localeCompare(b.name); // Alphabétique
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  // RENDER - affichage du composant
  return (
    <div style={styles.container}>
      {/* En-tête avec nombre de résultats et tri */}
      <div style={styles.header}>
        <div style={styles.resultsCount}>
          <span style={styles.countNumber}>{oscs.length}</span>
          <span style={styles.countText}>OSC trouvées</span>
        </div>
        
       
      </div>

      {/* État de chargement */}
      {loading && (
        <div style={styles.loadingState}>
          <div style={styles.loadingSpinner}></div>
          <p>Recherche en cours...</p>
        </div>
      )}

      {/* Grille des OSC */}
      {!loading && oscs.length > 0 && (
        <div style={styles.grid}>
          {sortedOSCs.map((osc) => (
            <OSCCard key={osc.id} osc={osc} />
          ))}
        </div>
      )}

      {/* État vide - aucun résultat */}
      {!loading && oscs.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}></div>
          <h3 style={styles.emptyTitle}>Aucune OSC trouvée</h3>
          <p style={styles.emptyText}>
            Essayez de modifier vos critères de recherche ou vos filtres
          </p>
        </div>
      )}
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  container: {
    width: '100%'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    padding: '15px 0',
    borderBottom: '1px solid #e4e6ea'
  },

  resultsCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  countNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1877f2' // Bleu Facebook
  },

  countText: {
    fontSize: '16px',
    color: '#65676b'
  },

  sortControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  sortLabel: {
    fontSize: '14px',
    color: '#65676b',
    fontWeight: '600'
  },

  sortSelect: {
    padding: '8px 12px',
    border: '2px solid #e4e6ea',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'white'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    padding: '10px 0'
  },

  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#65676b'
  },

  loadingSpinner: {
    fontSize: '48px',
    marginBottom: '16px',
    animation: 'spin 1s linear infinite'
  },

  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center'
  },

  emptyIcon: {
    fontSize: '64px',
    marginBottom: '20px',
    opacity: '0.5'
  },

  emptyTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1c1e21',
    marginBottom: '8px'
  },

  emptyText: {
    fontSize: '16px',
    color: '#65676b',
    lineHeight: '1.5',
    maxWidth: '400px'
  },

  // Responsive design
  '@media (max-width: 768px)': {
    header: {
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'stretch'
    },
    
    grid: {
      gridTemplateColumns: '1fr',
      gap: '20px'
    },
    
    sortControls: {
      justifyContent: 'center'
    }
  }
};

export default OSCGrid;