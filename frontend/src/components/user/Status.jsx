// components/user/Status.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert, Collapse } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [statusComplaints, setStatusComplaints] = useState([]);
  const [toggle, setToggle] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      axios
        .get(`http://localhost:8000/status/${user._id}`)
        .then((res) => setStatusComplaints(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleToggle = (id) => {
    setToggle((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {statusComplaints.length > 0 ? (
        statusComplaints.map((complaint) => {
          const isOpen = toggle[complaint._id] || false;

          return (
            <Card
              key={complaint._id}
              style={{
                width: '19rem',
                backgroundColor: '#000',
                color: '#FFD700',
                border: '1px solid #FFD700',
              }}
            >
              <Card.Body>
                <Card.Title>Name: {complaint.name}</Card.Title>
                <Card.Text>Address: {complaint.address}</Card.Text>
                <Card.Text>City: {complaint.city}</Card.Text>
                <Card.Text>State: {complaint.state}</Card.Text>
                <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                <Card.Text>Comment: {complaint.comment}</Card.Text>
                <Card.Text>Status: {complaint.status}</Card.Text>

                <Button
                  onClick={() => handleToggle(complaint._id)}
                  style={{
                    backgroundColor: '#FFD700',
                    color: '#000',
                    border: 'none',
                    fontWeight: 'bold',
                    marginTop: '10px',
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`chat-${complaint._id}`}
                >
                  Message
                </Button>

                <Collapse in={isOpen}>
                  <div id={`chat-${complaint._id}`} style={{ marginTop: '15px' }}>
                    <Card
                      style={{
                        backgroundColor: '#1E1E1E',
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      <ChatWindow complaintId={complaint._id} name={complaint.name} />
                    </Card>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Alert variant="dark" style={{ backgroundColor: '#1E1E1E', color: '#FFD700' }}>
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;
