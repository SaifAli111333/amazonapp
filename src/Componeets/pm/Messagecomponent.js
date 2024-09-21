import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from "axios";

function MessageComponent({ reportId, senderId, recipientId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:3000/message/${reportId}`, { headers });
        console.log('Fetched messages:', response.data); // Debug log
        setMessages(response.data || []); // Ensure messages is always an array
      } catch (err) {
        console.error('Error fetching messages', err);
      }
    };

    fetchMessages();
  }, [reportId]);

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await axios.post(
        'http://localhost:3000/message',
        {
          reportId,
          senderId,
          recipientId,
          content: newMessage,
        },
        { headers }
      );

      setNewMessage('');
      // Refresh messages after sending a new one
      const response = await axios.get(`http://localhost:3000/message/${reportId}`, { headers });
      console.log('Messages after sending:', response.data); // Debug log
      setMessages(response.data || []); // Ensure messages is always an array
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>
      <Box sx={{ 
        maxHeight: 400, 
        overflowY: 'auto', 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2, 
        padding: 2, 
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Box 
              key={msg._id}
              sx={{
                alignSelf: msg.senderId === senderId ? 'flex-start' : 'flex-end', // Align messages accordingly
                maxWidth: '80%',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Paper 
                elevation={2}
                sx={{
                  padding: 2,
                  backgroundColor: msg.senderId === senderId ? '#d1e7dd' : '#f8d7da',
                  textAlign: 'left',
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography>No messages</Typography>
        )}
      </Box>
      <TextField
        fullWidth
        label="New message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSendMessage} color="primary" variant="contained">
        Send
      </Button>
    </Box>
  );
}

export default MessageComponent;
