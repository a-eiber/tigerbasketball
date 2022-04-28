import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import RegisterNewAdmin from './RegisterNewAdmin';

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
      <h1>Dashboard</h1>
      <h3>Create New Admin</h3>
      <RegisterNewAdmin />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
