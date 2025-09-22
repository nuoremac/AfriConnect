// src/components/CreateProfileForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // client Supabase
import toast from 'react-hot-toast';

const CreateProfileForm = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mission: '',
    country: '',
    focus_areas: [],
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  // Liste des pays africains
  const countries = [
    'Cameroun', 'Sénégal', 'Ghana', 'Nigeria', 'Kenya', 'Afrique du Sud',
    'Maroc', 'Égypte', 'Éthiopie', 'Tanzanie', 'Mali', 'Burkina Faso',
    'Côte d\'Ivoire', 'Niger', 'Tchad', 'Autre'
  ];

  // Domaines d'intervention
  const availableFocusAreas = [
    'Éducation', 'Santé', 'Droits humains', 'Environnement',
    'Égalité des genres', 'Développement économique',
    'Gouvernance', 'Agriculture', 'Formation', 'Sensibilisation',
    'Protection', 'Justice', 'Jeunesse', 'Autonomisation'
  ];

  // Gestion des changements dans les inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Sélection/déselection d’un domaine d’intervention
  const handleFocusAreaChange = (area) => {
    if (formData.focus_areas.includes(area)) {
      setFormData({
        ...formData,
        focus_areas: formData.focus_areas.filter(a => a !== area)
      });
    } else {
      setFormData({
        ...formData,
        focus_areas: [...formData.focus_areas, area]
      });
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.focus_areas.length === 0) {
      toast.error('Veuillez sélectionner au moins un domaine');
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Création du compte utilisateur
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      // 2️⃣ Sauvegarde temporaire des infos dans localStorage
      localStorage.setItem("pendingProfile", JSON.stringify({
        name: formData.name,
        mission: formData.mission,
        country: formData.country,
        focus_areas: formData.focus_areas
      }));

      toast.success('Compte créé 🎉 Vérifiez votre email pour confirmer, puis connectez-vous.');
      navigate('/login');
    } catch (error) {
      console.error('Erreur:', error.message);
      toast.error('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={handleBackToHome}>AFRICONNECT</div>
          <button
            onClick={handleBackToHome}
            style={{
              ...styles.btnOutline,
              ...(hoveredButton === 'back' ? styles.btnOutlineHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Accueil
          </button>
        </div>
      </nav>

      {/* Formulaire */}
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h1 style={styles.formTitle}>Créer un profil</h1>
            <p style={styles.formSubtitle}>
              Rejoignez le réseau AfriConnect
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="exemple@mail.com"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nom de l'organisation *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Ex: EcoGreen Cameroun"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Mission *</label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Décrivez brièvement la mission de votre organisation..."
                  rows="4"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Pays *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="">Sélectionner un pays</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Domaines d'intervention *</label>
                <div style={styles.tagsContainer}>
                  {availableFocusAreas.map(area => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleFocusAreaChange(area)}
                      style={{
                        ...styles.tagButton,
                        ...(formData.focus_areas.includes(area) ? styles.tagButtonActive : {})
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Mot de passe *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirmer *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.btnPrimary,
                  ...(hoveredButton === 'submit' ? styles.btnPrimaryHover : {})
                }}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('submit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {loading ? 'Création...' : 'Créer mon profil'}
              </button>
            </form>

            <div style={styles.loginPrompt}>
              <p>
                Déjà un compte ?{' '}
                <button
                  onClick={handleGoToLogin}
                  style={styles.linkButton}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Styles (inchangés)
const styles = { 
  container: { fontFamily: 'sans-serif', background: '#f8f9fa', minHeight: '100vh' },
  navbar: { background: 'white', padding: '20px', borderBottom: '1px solid #1877f2' },
  navContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '32px', fontWeight: '700', color: '#1877f2', cursor: 'pointer' },
  btnOutline: { padding: '10px 20px', border: '2px solid #1877f2', borderRadius: '8px', background: 'white', cursor: 'pointer' },
  btnOutlineHover: { background: '#1877f2', color: 'white' },
  main: { display: 'flex', justifyContent: 'center', padding: '40px' },
  formContainer: { maxWidth: '700px', width: '100%' },
  formCard: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
  formTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '10px', textAlign: 'center' },
  formSubtitle: { textAlign: 'center', color: '#65676b', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column' },
  inputRow: { display: 'flex', gap: '16px' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd' },
  textarea: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd' },
  select: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd' },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  tagButton: { padding: '8px 12px', borderRadius: '20px', border: '1px solid #ddd', background: '#f0f2f5', cursor: 'pointer' },
  tagButtonActive: { background: '#1877f2', color: 'white' },
  btnPrimary: { padding: '12px 24px', background: '#ff6900', border: '2px solid #ff6900', color: 'white', borderRadius: '8px', cursor: 'pointer' },
  btnPrimaryHover: { background: '#e55a00' },
  loginPrompt: { marginTop: '20px', textAlign: 'center' },
  linkButton: { background: 'none', border: 'none', color: '#1877f2', cursor: 'pointer' }
};

export default CreateProfileForm;
