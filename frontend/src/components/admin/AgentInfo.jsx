import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Collapse, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../common/FooterC';

const AgentInfo = () => {
  const navigate = useNavigate();
  const [agentList, setAgentList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateAgent, setUpdateAgent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
      alert("Please fill at least one field to update.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to update the agent?");
    if (confirmed) {
      try {
        const res = await axios.put(`http://localhost:8000/user/${user_id}`, updateAgent);
        alert("Agent updated successfully.");
        console.log(res.data);
        setUpdateAgent({ name: '', email: '', phone: '' });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this agent?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
        setAgentList(agentList.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = (id) => {
    setToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:8000/agentUsers');
        setAgentList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAgents();
  }, [navigate]);

  return (
    <>
      <div style={{ backgroundColor: '#000', padding: '40px 20px', minHeight: '100vh', color: '#FFD700' }}>
        <Container>
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#FFD700' }}>Agent Management Panel</h2>
          <Row xs={1} md={2} lg={2} className="g-4">
            {agentList.length > 0 ? (
              agentList.map((agent) => (
                <Col key={agent._id}>
                  <Card style={{
                    backgroundColor: '#1E1E1E',
                    color: '#FFD700',
                    border: '1px solid #FFD700',
                    borderRadius: '15px',
                    boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)'
                  }}>
                    <Card.Body>
                      <Card.Title>{agent.name}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {agent.email}<br />
                        <strong>Phone:</strong> {agent.phone}
                      </Card.Text>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => handleToggle(agent._id)}
                          aria-controls={`collapse-${agent._id}`}
                          aria-expanded={toggle[agent._id] || false}
                        >
                          ✏️ Update
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteUser(agent._id)}
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                      <Collapse in={toggle[agent._id]}>
                        <div id={`collapse-${agent._id}`} className="mt-3">
                          <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(agent._id);
                          }}>
                            <Form.Group className="mb-2" controlId="formName">
                              <Form.Label style={{ color: '#FFD700' }}>Full Name</Form.Label>
                              <Form.Control
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }}
                                type="text"
                                name="name"
                                value={updateAgent.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                              />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formEmail">
                              <Form.Label style={{ color: '#FFD700' }}>Email</Form.Label>
                              <Form.Control
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }}
                                type="email"
                                name="email"
                                value={updateAgent.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                              />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formPhone">
                              <Form.Label style={{ color: '#FFD700' }}>Phone</Form.Label>
                              <Form.Control
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }}
                                type="tel"
                                name="phone"
                                value={updateAgent.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                              />
                            </Form.Group>
                            <Button type="submit" variant="success" size="sm" className="mt-2">
                              ✅ Submit Update
                            </Button>
                          </Form>
                        </div>
                      </Collapse>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Alert variant="dark" style={{ backgroundColor: '#222', color: '#FFD700' }} className="text-center mt-4">
                No Agents to display.
              </Alert>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AgentInfo;
