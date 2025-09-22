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
    const user = supabase.auth.user();
    if (user) {
      setCurrentUser({ id: user.id, name: user.user_metadata?.full_name || 'Moi' });
    }
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
        .select('*')
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

  // Envoi d’un message
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
    if (!name) return '';
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
                        {getInitials(msg.sender_name || `OSC ${msg.sender_id}`)}
                      </div>
                    )}

                    <div style={{
                      ...styles.messageBubble,
                      ...(msg.is_current_user ? styles.messageBubbleUser : styles.messageBubbleOther)
                    }}>
                      {!msg.is_current_user && <div style={styles.senderName}>{msg.sender_name || `OSC ${msg.sender_id}`}</div>}
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

// Styles inchangés pour brevité, tu peux réutiliser tes styles existants
const styles = { /* ... ton objet styles actuel ... */ };

export default CollaborationChat;
