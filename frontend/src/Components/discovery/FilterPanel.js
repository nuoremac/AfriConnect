// src/components/discovery/FilterPanel.js
import React, { useState } from 'react';
import { countries, sectors, sizes } from './mockData';

const FilterPanel = ({ onFilter, initialFilters = {} }) => {
  // STATE - état des filtres
  const [filters, setFilters] = useState({
    country: initialFilters.country || 'Tous les pays',
    sector: initialFilters.sector || 'Tous les secteurs',
    size: initialFilters.size || 'Toutes les tailles',
    ...initialFilters
  });

  // EVENTS - fonctions d'interaction
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    
    setFilters(newFilters);
    
    // Notifier le parent des nouveaux filtres
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      country: 'Tous les pays',
      sector: 'Tous les secteurs',
      size: 'Toutes les tailles'
    };
    
    setFilters(defaultFilters);
    
    if (onFilter) {
      onFilter(defaultFilters);
    }
  };

  // Compter les filtres actifs (différents de "Tous...")
  const activeFiltersCount = Object.values(filters).filter(
    value => value && !value.toString().startsWith('Tous')
  ).length;

  // RENDER - affichage du composant
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>
           Filtres
        </div>
        
        {activeFiltersCount > 0 && (
          <button 
            onClick={handleResetFilters}
            style={styles.resetButton}
          >
            ✕ Réinitialiser
          </button>
        )}
      </div>

      <div style={styles.filtersGrid}>
        {/* Filtre par pays */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Pays :</label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            style={styles.filterSelect}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par secteur */}
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Secteur :</label>
          <select
            value={filters.sector}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
            style={styles.filterSelect}
          >
            {sectors.map((sector, index) => (
              <option key={index} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par taille */}
        {/* <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Taille :</label>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            style={styles.filterSelect}
          >
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  container: {
    background: '#f0f2f5',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '25px',
    border: '1px solid #e4e6ea'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },

  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1c1e21',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  resetButton: {
    background: 'transparent',
    color: '#ff6900', // Orange
    border: '1px solid #ff6900',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },

  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1c1e21'
  },

  filterSelect: {
    padding: '10px 16px',
    border: '2px solid #e4e6ea',
    borderRadius: '8px',
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#1c1e21'
  },

  // Responsive design
  '@media (max-width: 768px)': {
    filtersGrid: {
      gridTemplateColumns: '1fr',
      gap: '15px'
    },
    
    header: {
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'stretch'
    },
    
    resetButton: {
      alignSelf: 'center'
    }
  }
};

export default FilterPanel;