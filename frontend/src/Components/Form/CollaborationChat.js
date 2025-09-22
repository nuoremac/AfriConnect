// src/Components/CollaborationChat.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CollaborationChat = () => {
  const { oscId } = useParams(); // ID de l'OSC avec qui on veut collaborer
  
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hoveredButton, setHoveredButton] = useState(null);
  const [currentUser] = useState({ id: 1, name: "Mon OSC" }); // Utilisateur connecté (à adapter)

  // Messages simulés basés sur votre structure BD
  const mockMessages = [
    {
      id: 1,
      cso_id: oscId,
      message: "Bonjour ! Je suis intéressé par une collaboration sur nos projets environnementaux.",
      created_at: "2025-01-20T10:30:00Z",
      sender_name: "EcoGreen Cameroun",
      is_current_user: false
    },
    {
      id: 2,
      cso_id: currentUser.id,
      message: "Excellent ! Nous travaillons également dans le domaine environnemental. Quels sont vos principaux projets ?",
      created_at: "2025-01-20T10:35:00Z",
      sender_name: "Mon OSC",
      is_current_user: true
    },
    {
      id: 3,
      cso_id: oscId,
      message: "Nous nous concentrons sur la sensibilisation communautaire et la protection des écosystèmes locaux. Nous cherchons des partenaires pour un projet de reforestation.",
      created_at: "2025-01-20T10:40:00Z",
      sender_name: "EcoGreen Cameroun",
      is_current_user: false
    }
  ];

  useEffect(() => {
    // Chargement des messages (à connecter à votre API)
    setMessages(mockMessages);
  }, [oscId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;

    // Nouveau message à envoyer
    const messageToSend = {
      id: messages.length + 1,
      cso_id: currentUser.id,
      message: newMessage,
      created_at: new Date().toISOString(),
      sender_name: currentUser.name,
      is_current_user: true
    };

    // TODO: Envoyer à votre API
    console.log('Envoie message:', messageToSend);

    // Mise à jour locale
    setMessages([...messages, messageToSend]);
    setNewMessage('');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>AFRICONNECT</div>
          <button 
            onClick={() => navigate('/discover')}
            style={{
              ...styles.btnOutline,
              ...(hoveredButton === 'back' ? styles.btnOutlineHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Retour aux découvertes
          </button>
        </div>
      </nav>

      {/* Chat Container */}
      <main style={styles.main}>
        <div style={styles.chatContainer}>
          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <div style={styles.headerInfo}>
              <div style={styles.avatar}>
                EG
              </div>
              <div>
                <h2 style={styles.chatTitle}>EcoGreen Cameroun</h2>
                <p style={styles.chatSubtitle}>Collaboration • Environnement</p>
              </div>
            </div>
            <div style={styles.statusDot}></div>
          </div>

          {/* Messages Area */}
          <div style={styles.messagesArea}>
            {messages.map((message, index) => {
              const showDate = index === 0 || 
                formatDate(messages[index - 1].created_at) !== formatDate(message.created_at);
              
              return (
                <div key={message.id}>
                  {showDate && (
                    <div style={styles.dateSeperator}>
                      {formatDate(message.created_at)}
                    </div>
                  )}
                  
                  <div style={{
                    ...styles.messageRow,
                    ...(message.is_current_user ? styles.messageRowRight : styles.messageRowLeft)
                  }}>
                    {!message.is_current_user && (
                      <div style={styles.senderAvatar}>
                        {message.sender_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    
                    <div style={{
                      ...styles.messageBubble,
                      ...(message.is_current_user ? styles.messageBubbleUser : styles.messageBubbleOther)
                    }}>
                      {!message.is_current_user && (
                        <div style={styles.senderName}>{message.sender_name}</div>
                      )}
                      <div style={styles.messageText}>{message.message}</div>
                      <div style={styles.messageTime}>{formatTime(message.created_at)}</div>
                    </div>
                    
                    {message.is_current_user && (
                      <div style={{...styles.senderAvatar, ...styles.userAvatar}}>
                        MO
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} style={styles.messageForm}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message de collaboration..."
                style={styles.messageInput}
              />
              <button
                type="submit"
                style={{
                  ...styles.sendButton,
                  ...(hoveredButton === 'send' ? styles.sendButtonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('send')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </main>
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
    borderBottom: '1px solid #e4e6ea',
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

  // Main chat
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '20px'
  },

  chatContainer: {
    width: '100%',
    maxWidth: '800px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '600px'
  },

  // Chat Header
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e4e6ea'
  },

  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },

  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#28a745',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px'
  },

  chatTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1c1e21'
  },

  chatSubtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#65676b'
  },

  statusDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#28a745'
  },

  // Messages
  messagesArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  dateSeperator: {
    textAlign: 'center',
    color: '#65676b',
    fontSize: '12px',
    padding: '10px 0',
    borderTop: '1px solid #e4e6ea',
    margin: '10px 0'
  },

  messageRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end'
  },

  messageRowLeft: {
    justifyContent: 'flex-start'
  },

  messageRowRight: {
    justifyContent: 'flex-end'
  },

  senderAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: '#1877f2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    flexShrink: 0
  },

  userAvatar: {
    background: '#ff6900'
  },

  messageBubble: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '20px',
    wordWrap: 'break-word'
  },

  messageBubbleOther: {
    background: '#f0f2f5',
    color: '#1c1e21'
  },

  messageBubbleUser: {
    background: '#1877f2',
    color: 'white'
  },

  senderName: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '4px',
    opacity: 0.8
  },

  messageText: {
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '4px'
  },

  messageTime: {
    fontSize: '11px',
    opacity: 0.7,
    textAlign: 'right'
  },

  // Message form
  messageForm: {
    padding: '20px',
    borderTop: '1px solid #e4e6ea'
  },

  inputContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },

  messageInput: {
    flex: 1,
    padding: '14px 18px',
    border: '2px solid #e4e6ea',
    borderRadius: '25px',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.3s ease'
  },

  sendButton: {
    padding: '14px 24px',
    background: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  },

  sendButtonHover: {
    background: '#166fe5',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(24, 119, 242, 0.3)'
  }
};

export default CollaborationChat;