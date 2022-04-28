import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import RegisterNewAdmin from './RegisterNewAdmin';
import AdminStories from './AdminStories';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return <h3>User Not Authorized!</h3>;
  }

  return (
    <div>
      <Container>
        <h1>Dashboard</h1>
        <hr />
        <AdminStories />
        <hr />
        <RegisterNewAdmin />
        <hr />
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </Container>
    </div>
  );
};

export default Dashboard;
