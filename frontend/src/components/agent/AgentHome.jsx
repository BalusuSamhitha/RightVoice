// AgentHome.js (Black-Gold Palette)
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Card, Alert, Collapse } from 'react-bootstrap';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [toggle, setToggle] = useState({});
  const [agentComplaintList, setAgentComplaintList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const { _id, name } = user;
          setUserName(name);
          const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
          setAgentComplaintList(response.data);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleStatusChange = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
      setAgentComplaintList((prev) =>
        prev.map((c) =>
          c._doc.complaintId === complaintId
            ? { ...c, _doc: { ...c._doc, status: 'completed' } }
            : c
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (id) => {
    setToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingBottom: '50px', color: '#FFD700' }}>
      <Navbar expand="lg" style={{ backgroundColor: '#1A1A1A' }} variant="dark">
        <Container fluid>
          <Navbar.Brand style={{ color: '#FFD700' }}>Hi Agent {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link style={{ color: '#FFD700' }}>View Complaints</Nav.Link>
            </Nav>
            <Button onClick={LogOut} variant="outline-warning">
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ padding: '40px 20px' }}>
        {agentComplaintList.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {agentComplaintList.map((complaint, index) => {
              const open = toggle[complaint._doc.complaintId] || false;
              return (
                <Card
                  key={index}
                  style={{ width: '20rem', backgroundColor: '#1E1E1E', color: '#FFD700', border: '1px solid #FFD700', boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)' }}
                >
                  <Card.Body>
                    <Card.Title>Name: {complaint.name}</Card.Title>
                    <Card.Text>Address: {complaint.address}</Card.Text>
                    <Card.Text>City: {complaint.city}</Card.Text>
                    <Card.Text>State: {complaint.state}</Card.Text>
                    <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                    <Card.Text>Comment: {complaint.comment}</Card.Text>
                    <Card.Text>Status: {complaint._doc.status}</Card.Text>

                    {complaint._doc.status !== 'completed' && (
                      <Button
                        onClick={() => handleStatusChange(complaint._doc.complaintId)}
                        variant="outline-success"
                        className="me-2"
                      >
                        ✅ Mark as Completed
                      </Button>
                    )}

                    <Button
                      onClick={() => handleToggle(complaint._doc.complaintId)}
                      aria-controls={`collapse-${complaint._doc.complaintId}`}
                      aria-expanded={open}
                      variant="outline-warning"
                    >
                      💬 Message
                    </Button>

                    <Collapse in={open}>
                      <div id={`collapse-${complaint._doc.complaintId}`} className="mt-3">
                        <Card body style={{ backgroundColor: '#111', border: '1px solid #FFD700' }}>
                          <ChatWindow key={complaint._doc.complaintId} complaintId={complaint._doc.complaintId} name={userName} />
                        </Card>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        ) : (
          <Alert variant="dark" className="text-center mt-4" style={{ color: '#FFD700', backgroundColor: '#222', border: 'none' }}>
            <Alert.Heading>No complaints to show</Alert.Heading>
          </Alert>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default AgentHome;
