// UserInfo.js (Black-Gold Palette)
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const UserInfo = () => {
  const navigate = useNavigate();
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [toggle, setToggle] = useState({});

  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateUser.name && !updateUser.email && !updateUser.phone) {
      alert("Please fill at least one field to update.");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to update the user?");
    if (confirmed) {
      try {
        const res = await axios.put(`http://localhost:8000/user/${user_id}`, updateUser);
        alert("User updated successfully.");
        console.log(res.data);
        setUpdateUser({ name: '', email: '', phone: '' });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getOrdinaryRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/OrdinaryUsers');
        setOrdinaryList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrdinaryRecords();
  }, [navigate]);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete the user?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
        setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggle = (userId) => {
    setToggle((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '40px 20px', color: '#FFD700' }}>
        <Container>
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#FFD700' }}>User Management Panel</h2>
          <Table bordered responsive style={{ backgroundColor: '#1E1E1E', color: '#FFD700' }}>
            <thead>
              <tr style={{ backgroundColor: '#2E2E2E' }}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordinaryList.length > 0 ? (
                ordinaryList.map((user) => {
                  const open = toggle[user._id] || false;

                  return (
                    <tr key={user._id} style={{ backgroundColor: '#111' }}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button onClick={() => handleToggle(user._id)}
                          aria-controls={`collapse-${user._id}`}
                          aria-expanded={open}
                          className='mx-2'
                          variant="outline-warning">
                          ✏️ Update
                        </Button>
                        <Button onClick={() => deleteUser(user._id)} className='mx-2' variant="outline-danger">🗑️ Delete</Button>

                        <Collapse in={open}>
                          <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(user._id);
                          }} className='p-4 mt-2' style={{ backgroundColor: '#1E1E1E', border: '1px solid #FFD700', borderRadius: '10px' }}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                              <Form.Label style={{ color: '#FFD700' }}>Full Name</Form.Label>
                              <Form.Control name='name' value={updateUser.name} onChange={handleChange} type="text" placeholder="Enter name"
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label style={{ color: '#FFD700' }}>Email</Form.Label>
                              <Form.Control name='email' value={updateUser.email} onChange={handleChange} type="email" placeholder="Enter email"
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                              <Form.Label style={{ color: '#FFD700' }}>Phone</Form.Label>
                              <Form.Control name='phone' value={updateUser.phone} onChange={handleChange} type="tel" placeholder="Enter Phone no."
                                style={{ backgroundColor: '#111', color: '#FFD700', border: '1px solid #FFD700' }} />
                            </Form.Group>
                            <Button size='sm' variant="success" type="submit">
                              ✅ Submit
                            </Button>
                          </Form>
                        </Collapse>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4">
                    <Alert variant="dark" style={{ backgroundColor: '#222', color: '#FFD700' }} className="text-center">
                      <Alert.Heading>No Users to show</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default UserInfo;
