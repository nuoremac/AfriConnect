// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  
  // États pour gérer le hover des boutons
  const [hoveredButton, setHoveredButton] = React.useState(null);

  // EVENTS - Navigation handlers
  const handleSignUp = () => {
    navigate('/create-profile');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
   navigate('/create-profile');
  };

  const handleDiscover = () => {
    navigate('/discover');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>AFRICONNECT</div>
          <div style={styles.navButtons}>
            <button 
              onClick={handleLogin} 
              style={{
                ...styles.btnOutline,
                ...(hoveredButton === 'login' ? styles.btnOutlineHover : {})
              }}
              onMouseEnter={() => setHoveredButton('login')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Se connecter
            </button>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroContainer}>
            <h1 style={styles.heroTitle}>Together, Let’s Build a Stronger African Civil Society</h1>
            <p style={styles.heroText}>
              La plateforme qui permet aux organisations de la société civile de se découvrir et collaborer efficacement.
            </p>
            <div style={styles.heroButtons}>
              <button 
                onClick={handleGetStarted} 
                style={{
                  ...styles.btnPrimary, 
                  ...styles.btnHero,
                  ...(hoveredButton === 'getstarted' ? styles.btnPrimaryHover : {})
                }}
                onMouseEnter={() => setHoveredButton('getstarted')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Créer mon profil
              </button>
              {/* <button 
                onClick={handleDiscover} 
                style={{
                  ...styles.btnOutline, 
                  ...styles.btnHero,
                  ...(hoveredButton === 'discover' ? styles.btnOutlineHover : {})
                }}
                onMouseEnter={() => setHoveredButton('discover')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Découvrir
              </button> */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={styles.footerText}> The Underdogs - Hackathon CIDP 2025</p>
        </div>
      </footer>
    </div>
  );
};

// STYLES - CSS en JavaScript
const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: '1.6',
    color: '#1c1e21',
    background: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  // Navigation
  navbar: {
    background: 'white',
    padding: '20px 0',
    borderBottom: '1px solid #1877f2',
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
    color: '#1877f2'
  },

  navButtons: {
    display: 'flex',
    gap: '15px'
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
    fontSize: '14px',
    textDecoration: 'none'
  },

  btnOutlineHover: {
    background: '#1877f2',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(24, 119, 242, 0.3)'
  },

  btnPrimary: {
    padding: '12px 24px',
    background: '#ff6900',
    color: 'white',
    border: '2px solid #ff6900',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    textDecoration: 'none'
  },

  btnPrimaryHover: {
    background: '#e55a00',
    borderColor: '#e55a00',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(255, 105, 0, 0.3)'
  },

  // Main content area
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Hero Section
  hero: {
    padding: '80px 20px',
    textAlign: 'center',
    background: 'white',
    width: '100%'
  },

  heroContainer: {
    maxWidth: '800px',
    margin: '0 auto'
  },

  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1c1e21',
    lineHeight: '1.2'
  },

  heroText: {
    fontSize: '20px',
    marginBottom: '40px',
    color: '#65676b',
    maxWidth: '600px',
    margin: '0 auto 40px auto'
  },

  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },

  btnHero: {
    padding: '16px 32px',
    fontSize: '16px'
  },

  // Footer
  footer: {
    background: '#e7effaff',
    padding: '30px 0',
    marginTop: 'auto'
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

  // Responsive design
  '@media (max-width: 768px)': {
    heroTitle: {
      fontSize: '36px'
    },
    heroText: {
      fontSize: '18px'
    },
    heroButtons: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    navButtons: {
      gap: '10px'
    },
    btnOutline: {
      padding: '10px 20px',
      fontSize: '13px'
    },
    btnPrimary: {
      padding: '10px 20px',
      fontSize: '13px'
    }
  }
};

export default LandingPage;