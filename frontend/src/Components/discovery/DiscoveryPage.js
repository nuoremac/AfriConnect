// src/components/discovery/DiscoveryPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import OSCGrid from './OSCGrid';
import { mockOSCs } from './mockData';

const DiscoveryPage = () => {
  // STATE - données de la page
  const [allOSCs] = useState(mockOSCs); // Toutes les OSC (données originales)
  const [filteredOSCs, setFilteredOSCs] = useState(mockOSCs); // OSC affichées après filtres
  const [loading, setLoading] = useState(false); // État de chargement
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche
  const [currentFilters, setCurrentFilters] = useState({}); // Filtres actifs

  // EVENTS - fonctions d'interaction : rechercher par mot clé
  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, currentFilters);
  };

  // Filtrage par critères
  const handleFilter = (newFilters) => {
    setCurrentFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  // Fonction pour appliquer recherche + filtres
  const applyFilters = (term, filters) => {
    setLoading(true);
    
    // Simuler un délai de recherche (optionnel)
    setTimeout(() => {
      let result = [...allOSCs];

      // Appliquer la recherche par terme
      if (term && term.trim() !== '') {
        result = result.filter(osc => {
          const searchLower = term.toLowerCase();
          return (
            osc.name.toLowerCase().includes(searchLower) ||
            osc.description.toLowerCase().includes(searchLower) ||
            osc.location.toLowerCase().includes(searchLower) ||
            osc.focus_areas.some(area => 
              area.toLowerCase().includes(searchLower)
            )
          );
        });
      }

      // Appliquer les filtres
      if (filters.country && filters.country !== 'Tous les pays') {
        result = result.filter(osc => osc.country === filters.country);
      }

      if (filters.sector && filters.sector !== 'Tous les secteurs') {
        result = result.filter(osc => 
          osc.focus_areas.includes(filters.sector)
        );
      }

      // Filtre par taille supprimé selon demande utilisateur

      setFilteredOSCs(result);
      setLoading(false);
    }, 300); // 300ms de délai pour simuler une recherche
  };

  // Effect pour initialiser la page
  useEffect(() => {
    // Au chargement de la page, afficher toutes les OSC
    setFilteredOSCs(allOSCs);
  }, [allOSCs]);

  // RENDER - affichage de la page
  return (
    <div style={styles.container}>
      {/* En-tête de la page */}
      <div style={styles.header}>
        <h1 style={styles.title}> Découvrir les OSC</h1>
        <p style={styles.subtitle}>
          Trouvez des partenaires compatibles avec vos projets et initiatives
        </p>
      </div>

      {/* Barre de recherche */}
      <SearchBar 
        onSearch={handleSearch}
        placeholder="Rechercher par nom, secteur, expertise, localisation..."
      />

      {/* Panneau de filtres */}
      <FilterPanel 
        onFilter={handleFilter}
        initialFilters={currentFilters}
      />

      {/* Grille des OSC */}
      <OSCGrid 
        oscs={filteredOSCs}
        loading={loading}
      />
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px 0'
  },

  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1c1e21',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #1877f2, #ff6900)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },

  subtitle: {
    fontSize: '18px',
    color: '#65676b',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto'
  },

  // Responsive design
  '@media (max-width: 768px)': {
    container: {
      padding: '10px'
    },
    
    header: {
      marginBottom: '30px'
    },
    
    title: {
      fontSize: '28px'
    },
    
    subtitle: {
      fontSize: '16px'
    }
  }
};

export default DiscoveryPage;