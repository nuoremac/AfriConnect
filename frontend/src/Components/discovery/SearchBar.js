// src/components/discovery/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Rechercher par nom, secteur, expertise..." }) => {
  // STATE - état du composant
  const [searchTerm, setSearchTerm] = useState('');

  // EVENTS - fonctions d'interaction
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Recherche en temps réel (optionnel)
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  // RENDER - affichage du composant
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          {/* Icône de recherche */}
          <div style={styles.searchIcon}>
            
          </div>
          
          {/* Input de recherche */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            style={styles.input}
          />
          
          {/* Bouton clear (si il y a du texte) */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              style={styles.clearButton}
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Bouton de recherche */}
        <button 
          type="submit" 
          style={styles.searchButton}
        >
          Rechercher
        </button>
      </form>
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  container: {
    width: '100%',
    marginBottom: '20px'
  },

  form: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    width: '100%'
  },

  inputGroup: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },

  searchIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '18px',
    color: '#65676b',
    zIndex: 1,
    pointerEvents: 'none'
  },

  input: {
    width: '100%',
    padding: '14px 50px 14px 50px', // Espace pour icônes
    border: '2px solid #e4e6ea',
    borderRadius: '25px',
    fontSize: '16px',
    background: 'white',
    transition: 'all 0.3s ease',
    outline: 'none',
    color: '#1c1e21',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Style quand input est focus
  inputFocus: {
    borderColor: '#1877f2', // Bleu Facebook
    boxShadow: '0 0 0 3px rgba(24, 119, 242, 0.1)'
  },

  clearButton: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#65676b',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px'
  },

  searchButton: {
    padding: '14px 24px',
    background: '#1877f2', // Bleu Facebook
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(24, 119, 242, 0.3)',
    whiteSpace: 'nowrap' // Empêche le texte de passer à la ligne
  },

  searchButtonHover: {
    background: '#1565c0',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)'
  },

  // Responsive design
  '@media (max-width: 768px)': {
    form: {
      flexDirection: 'column',
      gap: '15px'
    },
    
    searchButton: {
      width: '100%'
    },
    
    input: {
      fontSize: '16px' // Empêche le zoom sur iOS
    }
  }
};

export default SearchBar;