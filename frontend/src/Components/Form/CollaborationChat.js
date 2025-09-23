// src/components/Form/CollaborationChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const CollaborationChat = () => {
  const { oscId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hoveredButton, setHoveredButton] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '' });

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser({ id: user.id, name: user.user_metadata?.full_name || 'Moi' });
      }
    };
    getUser();
  }, []);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Charger les messages + abonnement temps réel
  useEffect(() => {
    if (!oscId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, chat_id, sender_id, content, created_at')
        .eq('chat_id', oscId)
        .order('created_at', { ascending: true });

      if (error) console.error('Erreur chargement messages:', error.message);
      else {
        setMessages(data.map(msg => ({
          ...msg,
          is_current_user: msg.sender_id === currentUser.id
        })));
        scrollToBottom();
      }
    };

    fetchMessages();

    // Abonnement temps réel
    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        const newMsg = payload.new;
        setMessages(prev => [
          ...prev,
          { ...newMsg, is_current_user: newMsg.sender_id === currentUser.id }
        ]);
        scrollToBottom();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [oscId, currentUser.id]);

  // Envoi d'un message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          chat_id: oscId,
          sender_id: currentUser.id,
          content: newMessage
        }
      ]);

    if (error) console.error('Erreur envoi message:', error.message);
    else setNewMessage('');
  };

  // Générer initiales
  const getInitials = (name) => {
    if (!name) return 'O';
    return name
      .split(' ')
      .map(w => w[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('fr-FR');

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>AFRICONNECT</div>
          <button
            style={{
              ...styles.btnOutline,
              ...(hoveredButton === 'back' ? styles.btnOutlineHover : {})
            }}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate('/discover')}
          >
            Retour aux découvertes
          </button>
        </div>
      </nav>

      {/* Chat */}
      <main style={styles.main}>
        <div style={styles.chatContainer}>
          {/* Messages */}
          <div style={styles.messagesArea}>
            {messages.map((msg, index) => {
              const showDate = index === 0 || formatDate(messages[index - 1].created_at) !== formatDate(msg.created_at);
              return (
                <div key={msg.id}>
                  {showDate && <div style={styles.dateSeperator}>{formatDate(msg.created_at)}</div>}

                  <div style={{
                    ...styles.messageRow,
                    ...(msg.is_current_user ? styles.messageRowRight : styles.messageRowLeft)
                  }}>
                    {!msg.is_current_user && (
                      <div style={styles.senderAvatar}>
                        {getInitials('OSC')}
                      </div>
                    )}

                    <div style={{
                      ...styles.messageBubble,
                      ...(msg.is_current_user ? styles.messageBubbleUser : styles.messageBubbleOther)
                    }}>
                      {!msg.is_current_user && <div style={styles.senderName}>Organisation</div>}
                      <div style={styles.messageText}>{msg.content}</div>
                      <div style={styles.messageTime}>{formatTime(msg.created_at)}</div>
                    </div>

                    {msg.is_current_user && (
                      <div style={{ ...styles.senderAvatar, ...styles.userAvatar }}>
                        {getInitials(currentUser.name)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} style={styles.messageForm}>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
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

const styles = {
  container: { 
    fontFamily: 'sans-serif', 
    background: '#f8f9fa', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: { 
    background: 'white', 
    padding: '20px', 
    borderBottom: '1px solid #1877f2',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  navContainer: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logo: { 
    fontSize: '32px', 
    fontWeight: '700', 
    color: '#1877f2', 
    cursor: 'pointer' 
  },
  btnOutline: { 
    padding: '10px 20px', 
    border: '2px solid #1877f2', 
    borderRadius: '8px', 
    background: 'white', 
    cursor: 'pointer',
    color: '#1877f2',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  btnOutlineHover: { 
    background: '#1877f2', 
    color: 'white' 
  },
  main: { 
    flex: 1,
    display: 'flex', 
    justifyContent: 'center', 
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  chatContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '800px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column'
  },
  messagesArea: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  dateSeperator: {
    textAlign: 'center',
    color: '#65676b',
    fontSize: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #e4e6ea',
    marginBottom: '10px'
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
    marginBottom: '5px'
  },
  messageRowLeft: {
    justifyContent: 'flex-start'
  },
  messageRowRight: {
    justifyContent: 'flex-end'
  },
  senderAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#1877f2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0
  },
  userAvatar: {
    background: '#42b883'
  },
  messageBubble: {
    maxWidth: '60%',
    padding: '12px 16px',
    borderRadius: '18px',
    position: 'relative'
  },
  messageBubbleOther: {
    background: '#f0f2f5',
    color: '#1c1e21'
  },
  messageBubbleUser: {
    background: '#0084ff',
    color: 'white'
  },
  senderName: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px',
    opacity: 0.8
  },
  messageText: {
    fontSize: '15px',
    lineHeight: '1.4',
    wordWrap: 'break-word'
  },
  messageTime: {
    fontSize: '11px',
    opacity: 0.7,
    marginTop: '4px'
  },
  messageForm: {
    padding: '20px',
    borderTop: '1px solid #e4e6ea',
    background: '#fafbfc'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  messageInput: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #ccd0d5',
    borderRadius: '20px',
    fontSize: '15px',
    outline: 'none',
    background: 'white',
    transition: 'border-color 0.2s'
  },
  sendButton: {
    padding: '12px 24px',
    background: '#0084ff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s'
  },
  sendButtonHover: {
    background: '#0066cc'
  }
};

export default CollaborationChat;