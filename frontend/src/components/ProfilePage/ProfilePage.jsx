import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ProfilePage.css';

const ProfilePage = () => {
  const { oscId } = useParams(); // Récupérer l'ID depuis l'URL
  const [oscData, setOscData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOSCData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('csos')
          .select('*')
          .eq('id', oscId)
          .single();

        if (error) {
          console.error('Erreur récupération OSC:', error);
          setError('Impossible de charger le profil');
        } else {
          setOscData(data);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (oscId) {
      fetchOSCData();
    }
  }, [oscId]);

  // État de chargement
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <h2>Chargement du profil...</h2>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error || !oscData) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <h2>Profil introuvable</h2>
          <p>{error || 'Cette organisation n\'existe pas'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-name">{oscData.name}</h1>
        <p className="profile-mission">{oscData.mission}</p>
      </header>

      <main className="profile-main">
        <section className="profile-section">
          <h2 className="section-title">Informations clés</h2>
          <div className="info-grid">
            <div>
              <p className="info-label">Pays</p>
              <p className="info-value">{oscData.country}</p>
            </div>
            <div>
              <p className="info-label">Domaines d'intervention</p>
              <div className="focus-areas-tags">
                {oscData.focus_areas && oscData.focus_areas.length > 0 ? (
                  oscData.focus_areas.map((area, index) => (
                    <span key={index} className="tag">
                      {area}
                    </span>
                  ))
                ) : (
                  <span className="no-data">Aucun domaine spécifié</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section additionnelle si vous avez d'autres données */}
        <section className="profile-section">
          <h2 className="section-title">Détails</h2>
          <div className="details-grid">
            <div>
              <p className="info-label">Date de création</p>
              <p className="info-value">
                {oscData.created_at 
                  ? new Date(oscData.created_at).toLocaleDateString('fr-FR')
                  : 'Non spécifiée'
                }
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;