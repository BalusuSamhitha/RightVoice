// Login.jsx (Updated with Black-Gold Theme and Enhanced Styling)
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/Login", user)
      .then((res) => {
        alert("Successfully logged in");
        localStorage.setItem("user", JSON.stringify(res.data));
        const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        const { userType } = isLoggedIn;
        switch (userType) {
          case "Admin":
            navigate("/AdminHome");
            break;
          case "Ordinary":
            navigate("/HomePage");
            break;
          case "Agent":
            navigate("/AgentHome");
            break;
          default:
            navigate("/Login");
            break;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn’t exist");
        }
        navigate("/Login");
      });
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#000' }} variant="dark">
        <Container>
          <Navbar.Brand style={{ color: '#FFD700', fontWeight: 'bold' }}>RightVoice
          </Navbar.Brand>
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

      <section className="vh-100" style={{ backgroundColor: '#1E1E1E', color: '#FFD700' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card" style={{ backgroundColor: '#2E2E2E', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '12px' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-4">Login For Registering the Complaint</h2>
                    <p className="text-light mb-5">Please enter your Credentials!</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required style={{ backgroundColor: '#1E1E1E', color: '#FFD700', borderColor: '#FFD700' }} />
                        <label className="form-label text-light" htmlFor="email">Email</label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" autoComplete="off" required style={{ backgroundColor: '#1E1E1E', color: '#FFD700', borderColor: '#FFD700' }} />
                        <label className="form-label text-light" htmlFor="password">Password</label>
                      </div>

                      <button className="btn btn-warning btn-lg px-5" type="submit">Login</button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0 text-light">Don't have an account? <Link to="/SignUp" style={{ color: '#FFD700' }}>SignUp</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;
