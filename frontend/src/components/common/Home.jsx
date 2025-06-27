// Home.jsx (Updated with Black-Gold Theme and Enhanced Styling)
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image1 from '../../Images/Image1.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';

const Home = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: '#000' }} variant="dark">
        <Container>
          <Navbar.Brand style={{ color: '#FFD700', fontWeight: 'bold' }}>RightVoice</Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <Link to={'/'} className="nav-link" style={{ color: '#FFD700' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/signup'} className="nav-link" style={{ color: '#FFD700' }}>SignUp</Link>
            </li>
            <li className="nav-item">
              <Link to={'/login'} className="nav-link" style={{ color: '#FFD700' }}>Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      <Container className='home-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#1E1E1E', minHeight: '80vh' }}>
        <div className="left-side" style={{ flex: 1, padding: '20px' }}>
          <img src={Image1} alt="illustration" style={{ width: '100%', maxHeight: '400px', borderRadius: '12px', boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }} />
        </div>
        <div className="right-side" style={{ flex: 1, color: '#FFD700', padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Empower Your Team,</span><br />
            <span>Exceed Customer Expectations: Discover our</span><br />
            <span style={{ fontStyle: 'italic', fontSize: '1.3rem' }}>Complaint Management Solution</span><br />
            <Link to={'/Login'}>
              <Button className='mt-4' style={{ backgroundColor: '#FFD700', color: '#000', border: 'none', fontWeight: 'bold', padding: '10px 20px', borderRadius: '8px' }}>
                Register your Complaint
              </Button>
            </Link>
          </p>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
