// src/components/discovery/DiscoveryPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import OSCGrid from './OSCGrid';
import supabase from '../supabaseClient'; // ⚡ Vérifie ton chemin vers supabaseClient

const DiscoveryPage = () => {
  // STATE
  const [allOSCs, setAllOSCs] = useState([]); 
  const [filteredOSCs, setFilteredOSCs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilters, setCurrentFilters] = useState({});

  // Générer des initiales à partir du nom
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0]?.toUpperCase())
      .join('')
      .slice(0, 2); // max 2 lettres
  };

  // Fonction pour formater un OSC (sans percentage)
  const formatOSC = (osc) => ({
    ...osc,
    focus_areas: Array.isArray(osc.focus_areas)
      ? osc.focus_areas
      : (osc.focus_areas ? osc.focus_areas.split(',') : []),
    initials: getInitials(osc.name)
  });

  // FETCH depuis Supabase
  useEffect(() => {
    const fetchOSCs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('csos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur récupération OSC:', error.message);
      } else {
        const formattedData = data.map(formatOSC);
        setAllOSCs(formattedData);
        setFilteredOSCs(formattedData);
      }
      setLoading(false);
    };

    fetchOSCs();
  }, []);

  // EVENTS - recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, currentFilters);
  };

  // EVENTS - filtres
  const handleFilter = (newFilters) => {
    setCurrentFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  // Fonction recherche + filtres
  const applyFilters = (term, filters) => {
    setLoading(true);

    setTimeout(() => {
      let result = [...allOSCs];

      // Recherche par mot clé
      if (term && term.trim() !== '') {
        result = result.filter(osc => {
          const searchLower = term.toLowerCase();
          return (
            osc.name?.toLowerCase().includes(searchLower) ||
            osc.mission?.toLowerCase().includes(searchLower) ||
            osc.country?.toLowerCase().includes(searchLower) ||
            osc.focus_areas?.some(area =>
              area.toLowerCase().includes(searchLower)
            )
          );
        });
      }

      // Filtre par pays
      if (filters.country && filters.country !== 'Tous les pays') {
        result = result.filter(osc => osc.country === filters.country);
      }

      // Filtre par secteur
      if (filters.sector && filters.sector !== 'Tous les secteurs') {
        result = result.filter(osc =>
          osc.focus_areas.includes(filters.sector)
        );
      }

      // ⚡ Reformater pour garantir initials (sans percentage)
      result = result.map(formatOSC);

      setFilteredOSCs(result);
      setLoading(false);
    }, 300);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Découvrir les OSC</h1>
        <p style={styles.subtitle}>
          Trouvez des partenaires compatibles avec vos projets et initiatives
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Rechercher par nom, mission, secteur, localisation..."
      />

      <FilterPanel
        onFilter={handleFilter}
        initialFilters={currentFilters}
      />

      <OSCGrid
        oscs={filteredOSCs}
        loading={loading}
      />
    </div>
  );
};

// STYLES (ajustés pour enlever toute référence au pourcentage)
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
    background: '#1877f2',
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
  // Si le pourcentage était stylisé dans OSCGrid, supprime ces styles si présents
  // Exemple de style à enlever (si applicable) :
  // progressBar: {
  //   width: '100%',
  //   height: '10px',
  //   background: '#e0e0e0',
  //   borderRadius: '5px'
  // },
  // percentageText: {
  //   fontSize: '14px',
  //   color: '#333'
  // }
};

export default DiscoveryPage;