// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [formData, setFormData] = useState({
    organizationName: '',
    password: ''
  });

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Authentification avec nom organisation + mot de passe
    console.log('Connexion OSC:', formData);
    // Redirection vers découverte après connexion
    navigate('/discover');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToCreateProfile = () => {
    navigate('/create-profile');
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

      {/* Formulaire de connexion OSC */}
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h1 style={styles.formTitle}>Se connecter</h1>
            <p style={styles.formSubtitle}>
              Accédez à votre compte organisation
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nom de l'organisation *</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Nom de votre OSC"
                  required
                />
              </div>

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
                />
              </div>

              <div style={styles.formOptions}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  Se souvenir de moi
                </label>
                <a href="#" style={styles.forgotLink}>
                  Mot de passe oublié ?
                </a>
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
                Se connecter
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerText}>ou</span>
            </div>

            <div style={styles.signupPrompt}>
              <p style={styles.signupText}>
                Pas encore inscrit ?{' '}
                <button
                  onClick={handleGoToCreateProfile}
                  style={{
                    ...styles.linkButton,
                    ...(hoveredButton === 'create' ? styles.linkButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredButton('create')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Créer un profil
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
    maxWidth: '400px'
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
    gap: '20px'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
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

  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    color: '#65676b',
    cursor: 'pointer'
  },

  checkbox: {
    marginRight: '8px'
  },

  forgotLink: {
    color: '#1877f2',
    textDecoration: 'none',
    fontWeight: '500'
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
    margin: '24px 0',
    position: 'relative'
  },

  dividerText: {
    background: 'white',
    color: '#65676b',
    padding: '0 16px',
    fontSize: '14px'
  },

  signupPrompt: {
    textAlign: 'center'
  },

  signupText: {
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
  }
};

export default LoginForm;