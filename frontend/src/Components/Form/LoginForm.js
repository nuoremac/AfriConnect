// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tentative de connexion
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.toLowerCase(),
        password: formData.password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ou mot de passe incorrect.');
        } else if (error.message.includes('Email not confirmed')) {
          // Renvoi automatique de l'email de confirmation
          const { error: resendError } = await supabase.auth.resendConfirmationEmail({
            email: formData.email.toLowerCase()
          });
          if (resendError) {
            toast.error('Erreur lors de l’envoi de l’email de confirmation: ' + resendError.message);
          } else {
            toast.error('Votre email n’est pas confirmé. Un email de confirmation a été renvoyé.');
          }
        } else {
          toast.error('Erreur: ' + error.message);
        }
        throw error;
      }

      // Connexion réussie
      toast.success('Connexion réussie !');
      navigate('/discover');

    } catch (err) {
      console.error('Erreur de connexion:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => navigate('/');
  const handleGoToCreateProfile = () => navigate('/create-profile');

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={handleBackToHome}>AFRICONNECT</div>
          <button
            onClick={handleBackToHome}
            style={{ ...styles.btnOutline, ...(hoveredButton==='back'?styles.btnOutlineHover:{}) }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
          >Accueil</button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h1 style={styles.formTitle}>Se connecter</h1>
            <p style={styles.formSubtitle}>Accédez à votre compte organisation</p>

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

              <button
                type="submit"
                style={{ ...styles.btnPrimary, ...(hoveredButton==='submit'?styles.btnPrimaryHover:{}), marginTop: '8px' }}
                disabled={loading}
                onMouseEnter={() => setHoveredButton('submit')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div style={styles.signupPrompt}>
              <p>
                Pas encore inscrit ?{' '}
                <button
                  onClick={handleGoToCreateProfile}
                  style={{ ...styles.linkButton, ...(hoveredButton==='create'?styles.linkButtonHover:{}) }}
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
    </div>
  );
};

// Styles (reprendre ceux de CreateProfileForm.js)
const styles = {
  container: { fontFamily: 'sans-serif', background: '#f8f9fa', minHeight: '100vh' },
  navbar: { background: 'white', padding: '20px', borderBottom: '1px solid #1877f2' },
  navContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '32px', fontWeight: '700', color: '#1877f2', cursor: 'pointer' },
  btnOutline: { padding: '10px 20px', border: '2px solid #1877f2', borderRadius: '8px', background: 'white', cursor: 'pointer' },
  btnOutlineHover: { background: '#1877f2', color: 'white' },
  main: { display: 'flex', justifyContent: 'center', padding: '40px' },
  formContainer: { maxWidth: '400px', width: '100%' },
  formCard: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
  formTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '10px', textAlign: 'center' },
  formSubtitle: { textAlign: 'center', color: '#65676b', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd' },
  btnPrimary: { padding: '12px 24px', background: '#ff6900', border: '2px solid #ff6900', color: 'white', borderRadius: '8px', cursor: 'pointer' },
  btnPrimaryHover: { background: '#e55a00' },
  signupPrompt: { textAlign: 'center', marginTop: '20px' },
  linkButton: { background: 'none', border: 'none', color: '#1877f2', cursor: 'pointer' },
  linkButtonHover: { color: '#e55a00' }
};

export default LoginForm;
