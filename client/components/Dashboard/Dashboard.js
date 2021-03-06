import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const adminToken = localStorage.getItem('token');

  if (!user || !adminToken) {
    return <h3>User Not Authorized!</h3>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-3">Dashboard</h1>
        <h3 className="text-center mt-3"> Welcome {user.username}</h3>
        <hr />
        <div className="d-flex justify-content-between">
          <Button
            className="mx-3"
            variant="primary"
            onClick={() => navigate('/dashboard/new-team')}>
            Create New Team
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            onClick={() => navigate('/dashboard/new-game-day')}>
            Create New Game Day
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            onClick={() => navigate('/dashboard/new-game')}>
            Create New Game
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            onClick={() => navigate('/dashboard/new-story')}>
            Create News Alert
          </Button>
          <Button
            className="mx-3"
            variant="primary"
            onClick={() => navigate('/dashboard/new-admin')}>
            Create New Admin
          </Button>
        </div>
        <Button variant="secondary" className="mt-3" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
