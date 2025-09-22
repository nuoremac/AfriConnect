// src/components/CreateProfileForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProfileForm = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mission: '',
    country: '',
    focus_areas: [],
    password: '',
    confirmPassword: ''
  });

  // Options pour les pays africains
  const countries = [
    'Cameroun', 'Sénégal', 'Ghana', 'Nigeria', 'Kenya', 'Afrique du Sud',
    'Maroc', 'Égypte', 'Éthiopie', 'Tanzanie', 'Mali', 'Burkina Faso',
    'Côte d\'Ivoire', 'Niger', 'Tchad', 'Autre'
  ];

  // Domaines d'intervention possibles
  const availableFocusAreas = [
    'Éducation', 'Santé', 'Droits humains', 'Environnement', 
    'Égalité des genres', 'Développement économique', 
    'Gouvernance', 'Agriculture', 'Formation', 'Sensibilisation',
    'Protection', 'Justice', 'Jeunesse', 'Autonomisation'
  ];

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gestion des domaines d'intervention (multiple)
  const handleFocusAreaChange = (area) => {
    const currentAreas = formData.focus_areas;
    if (currentAreas.includes(area)) {
      setFormData({
        ...formData,
        focus_areas: currentAreas.filter(a => a !== area)
      });
    } else {
      setFormData({
        ...formData,
        focus_areas: [...currentAreas, area]
      });
    }
  };

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation mot de passe
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Validation domaines d'intervention
    if (formData.focus_areas.length === 0) {
      alert('Veuillez sélectionner au moins un domaine d\'intervention');
      return;
    }

    // TODO: Enregistrement en base de données
    const oscProfile = {
      name: formData.name,
      mission: formData.mission,
      country: formData.country,
      focus_areas: formData.focus_areas.join(', '), // Conversion en string pour la DB
      password: formData.password,
      created_at: new Date().toISOString()
    };

    console.log('Nouveau profil OSC à enregistrer:', oscProfile);
    
    // Redirection vers découverte après création
    navigate('/discover');
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

      {/* Formulaire de création de profil */}
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h1 style={styles.formTitle}>Créer un profil</h1>
            <p style={styles.formSubtitle}>
              Rejoignez le réseau AfriConnect
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
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
                <label style={styles.label}>Mission de l'organisation *</label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Décrivez brièvement la mission et les objectifs de votre organisation..."
                  rows="4"
                  required
                />
              </div>

              <div style={styles.inputRow}>
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
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Domaines d'intervention * (sélectionner plusieurs)</label>
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
                {formData.focus_areas.length > 0 && (
                  <p style={styles.selectedText}>
                    Sélectionnés: {formData.focus_areas.join(', ')}
                  </p>
                )}
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
                  <label style={styles.label}>Confirmer le mot de passe *</label>
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

              <div style={styles.termsGroup}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} required />
                  J'accepte les conditions d'utilisation et la politique de confidentialité
                </label>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.btnPrimary,
                  ...styles.btnSubmit,
                  ...(hoveredButton === 'submit' ? styles.btnPrimaryHover : {})
                }}
                onMouseEnter={() => setHoveredButton('submit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Créer mon profil
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerText}>ou</span>
            </div>

            <div style={styles.loginPrompt}>
              <p style={styles.loginText}>
                Déjà un compte ?{' '}
                <button
                  onClick={handleGoToLogin}
                  style={{
                    ...styles.linkButton,
                    ...(hoveredButton === 'login' ? styles.linkButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredButton('login')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerText}>Les outsiders - Hackathon CIDP 2025</p>
        </div>
      </footer>
    </div>
  );
};

// STYLES
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: '1.6',
    color: '#1c1e21',
    background: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  // Navigation
  navbar: {
    background: 'white',
    padding: '20px 0',
    borderBottom: '1px solid #1877f2',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },

  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1877f2',
    cursor: 'pointer'
  },

  btnOutline: {
    padding: '12px 24px',
    background: 'white',
    color: '#1877f2',
    border: '2px solid #1877f2',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  },

  btnOutlineHover: {
    background: '#1877f2',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(24, 119, 242, 0.3)'
  },

  // Main content
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  },

  formContainer: {
    width: '100%',
    maxWidth: '700px'
  },

  formCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    border: '1px solid #e4e6ea'
  },

  formTitle: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#1c1e21',
    textAlign: 'center'
  },

  formSubtitle: {
    fontSize: '16px',
    color: '#65676b',
    textAlign: 'center',
    marginBottom: '32px'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },

  inputRow: {
    display: 'flex',
    gap: '16px'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1c1e21',
    marginBottom: '8px'
  },

  input: {
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e4e6ea',
    borderRadius: '8px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit'
  },

  textarea: {
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e4e6ea',
    borderRadius: '8px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '100px'
  },

  select: {
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e4e6ea',
    borderRadius: '8px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit',
    background: 'white'
  },

  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px'
  },

  tagButton: {
    padding: '8px 16px',
    background: '#f0f2f5',
    color: '#65676b',
    border: '2px solid #e4e6ea',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  tagButtonActive: {
    background: '#1877f2',
    color: 'white',
    borderColor: '#1877f2'
  },

  selectedText: {
    fontSize: '12px',
    color: '#1877f2',
    marginTop: '8px',
    fontStyle: 'italic'
  },

  termsGroup: {
    fontSize: '14px'
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    color: '#65676b',
    cursor: 'pointer',
    lineHeight: '1.4'
  },

  checkbox: {
    marginRight: '8px',
    marginTop: '2px',
    flexShrink: 0
  },

  btnPrimary: {
    padding: '16px 32px',
    background: '#ff6900',
    color: 'white',
    border: '2px solid #ff6900',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px'
  },

  btnPrimaryHover: {
    background: '#e55a00',
    borderColor: '#e55a00',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(255, 105, 0, 0.3)'
  },

  btnSubmit: {
    marginTop: '8px'
  },

  divider: {
    textAlign: 'center',
    margin: '24px 0'
  },

  dividerText: {
    background: 'white',
    color: '#65676b',
    padding: '0 16px',
    fontSize: '14px'
  },

  loginPrompt: {
    textAlign: 'center'
  },

  loginText: {
    color: '#65676b',
    fontSize: '14px',
    margin: 0
  },

  linkButton: {
    background: 'none',
    border: 'none',
    color: '#1877f2',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    fontSize: 'inherit',
    padding: 0
  },

  linkButtonHover: {
    color: '#e55a00'
  },

  // Footer
  footer: {
    background: '#e7effaff',
    padding: '30px 0'
  },

  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center'
  },

  footerText: {
    color: '#65676b',
    margin: 0,
    fontSize: '14px'
  },

  // Responsive
  '@media (max-width: 768px)': {
    inputRow: {
      flexDirection: 'column'
    },
    
    formCard: {
      padding: '30px 20px'
    }
  }
};

export default CreateProfileForm;