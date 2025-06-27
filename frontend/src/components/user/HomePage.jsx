import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand text-light">Hi, {userName}</h1>
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/Homepage/Complaint">Complaint Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/Homepage/Status">Status</NavLink>
            </li>
          </ul>
          <button className="btn btn-warning" onClick={Logout}>LogOut</button>
        </div>
      </nav>

      <div className="body" style={{ backgroundColor: '#1E1E1E', minHeight: '100vh', padding: '20px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
