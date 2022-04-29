import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { register, reset } from '../store/authSlice';

const RegisterNewAdmin = () => {
  toast.configure();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      return <h1>User Not Authorized!</h1>;
    }
  }, [user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(register({ username, password }));
    injectStyle();
    toast.success('New Admin added!');
    navigate('/dashboard');
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3">Create New Admin</h3>
        <h5 className="text-center mt-3">
          Caution: This new user will be able to create, update, and delete all
          parts of the website, so be careful who you allow to be a website
          administrator.
        </h5>

        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    </div>
  );
};

export default RegisterNewAdmin;
