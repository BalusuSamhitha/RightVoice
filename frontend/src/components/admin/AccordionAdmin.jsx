// AccordionAdmin.js (Black-Gold Palette)
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Footer from '../common/FooterC';
import axios from 'axios';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setComplaintList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComplaints();

    const getAgentsRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AgentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAgentsRecords();
  }, []);

  const handleSelection = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      const assignedComplaint = {
        agentId,
        complaintId,
        status,
        agentName,
      };

      await axios.post('http://localhost:8000/assignedComplaints', assignedComplaint);
      setComplaintList(complaintList.filter((c) => c._id !== complaintId));
      alert(`Complaint assigned to the Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#FFD700', padding: '30px', borderRadius: '15px' }}>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Users Complaints</Accordion.Header>
          <Accordion.Body style={{ backgroundColor: '#111', borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {complaintList.length > 0 ? (
                complaintList.map((complaint, index) => (
                  <Card
                    key={index}
                    style={{
                      width: '18rem',
                      backgroundColor: '#1E1E1E',
                      color: '#E0E0E0',
                      border: '1px solid #FFD700',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <Card.Body style={{ textAlign: 'center' }}>
                      <Card.Title style={{ color: '#FFD700' }}>Name: {complaint.name}</Card.Title>
                      <div style={{ fontSize: '14px', marginTop: '15px' }}>
                        <Card.Text>Address: {complaint.address}</Card.Text>
                        <Card.Text>City: {complaint.city}</Card.Text>
                        <Card.Text>State: {complaint.state}</Card.Text>
                        <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                        <Card.Text>Comment: {complaint.comment}</Card.Text>
                        <Card.Text>Status: {complaint.status}</Card.Text>
                      </div>
                      {complaint.status === 'completed' ? null : (
                        <Dropdown className="mt-3">
                          <Dropdown.Toggle variant="warning">Assign</Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agentList.map((agent, i) => (
                              <Dropdown.Item
                                key={i}
                                onClick={() =>
                                  handleSelection(agent._id, complaint._id, complaint.status, agent.name)
                                }
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="dark" style={{ backgroundColor: '#222', color: '#FFD700' }}>
                  <Alert.Heading>No complaints to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Agents</Accordion.Header>
          <Accordion.Body style={{ backgroundColor: '#111', borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {agentList.length > 0 ? (
                agentList.map((agent, index) => (
                  <Card
                    key={index}
                    style={{
                      width: '20rem',
                      backgroundColor: '#1E1E1E',
                      color: '#E0E0E0',
                      border: '1px solid #FFD700',
                      boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ color: '#FFD700' }}>Name: {agent.name}</Card.Title>
                      <Card.Text>Email: {agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="dark" style={{ backgroundColor: '#222', color: '#FFD700' }}>
                  <Alert.Heading>No Agents to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Footer />
    </div>
  );
};

export default AccordionAdmin;
