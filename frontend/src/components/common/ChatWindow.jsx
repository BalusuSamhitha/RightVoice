// ChatWindow.js (Black-Gold Themed - with fixed useEffect dependency)
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = (props) => {
  const [messageInput, setMessageInput] = useState('');
  const messageWindowRef = useRef(null);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
        setMessageList(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [props.complaintId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async () => {
    try {
      const data = {
        name: props.name,
        message: messageInput,
        complaintId: props.complaintId,
      };
      const response = await axios.post('http://localhost:8000/messages', data);
      setMessageList([...messageList, response.data]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  return (
    <div style={{ backgroundColor: '#1E1E1E', color: '#FFD700', padding: '10px', borderRadius: '8px', border: '1px solid #FFD700' }}>
      <h5 className="text-center mb-2">Message Box</h5>
      <div
        ref={messageWindowRef}
        style={{
          height: '200px',
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#111',
          border: '1px solid #FFD700',
          borderRadius: '5px',
          marginBottom: '10px',
        }}
      >
        {messageList.slice().reverse().map((msg) => (
          <div key={msg._id} style={{ marginBottom: '8px' }}>
            <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>{msg.name}: <span style={{ fontWeight: 'normal' }}>{msg.message}</span></p>
            <p style={{ fontSize: '10px', color: '#aaa', marginLeft: '10px' }}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      <div className="d-flex gap-2">
        <textarea
          rows="2"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={{ flex: 1, borderRadius: '5px', border: '1px solid #FFD700', padding: '6px', backgroundColor: '#000', color: '#FFD700' }}
        ></textarea>
        <button onClick={sendMessage} style={{ backgroundColor: '#FFD700', color: '#000', border: 'none', borderRadius: '5px', padding: '8px 12px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
