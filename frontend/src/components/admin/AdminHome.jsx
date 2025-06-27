// AdminHome.js (Black-Gold Themed)
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserName(user.name);
    else navigate('/');
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar style={{ background: '#1E1E1E', borderBottom: '1px solid #FFD700' }} variant="dark" expand="lg" fixed="top" className="px-4 shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold" style={{ color: '#FFD700' }}>👑 Admin {userName}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink className={`nav-link mx-2 ${activeComponent === 'dashboard' ? 'fw-bold' : ''}`} onClick={() => handleNavLinkClick('dashboard')} style={{ color: activeComponent === 'dashboard' ? '#FFD700' : '#CCCCCC' }}>🏠 Dashboard</NavLink>
              <NavLink className={`nav-link mx-2 ${activeComponent === 'UserInfo' ? 'fw-bold' : ''}`} onClick={() => handleNavLinkClick('UserInfo')} style={{ color: activeComponent === 'UserInfo' ? '#FFD700' : '#CCCCCC' }}>👤 Users</NavLink>
              <NavLink className={`nav-link mx-2 ${activeComponent === 'Agent' ? 'fw-bold' : ''}`} onClick={() => handleNavLinkClick('Agent')} style={{ color: activeComponent === 'Agent' ? '#FFD700' : '#CCCCCC' }}>🛠️ Agents</NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-light" className="fw-semibold">🚪 Log out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ background: '#1E1E1E', minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px', color: '#E0E0E0' }}>
        <Container style={{ backgroundColor: '#2E2E2E', borderRadius: '15px', padding: '30px', boxShadow: '0 0 12px rgba(255, 215, 0, 0.2)' }}>
          {activeComponent === 'dashboard' && <AccordionAdmin />}
          {activeComponent === 'UserInfo' && <UserInfo />}
          {activeComponent === 'Agent' && <AgentInfo />}
        </Container>
      </div>
    </>
  );
};

export default AdminHome;

// AccordionAdmin.js and AgentInfo.js were already adapted and styled above using same black-gold colors (included in earlier responses).
