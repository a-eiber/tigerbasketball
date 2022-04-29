import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTeam, getTeams, reset } from '../store/teamSlice';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const NewTeam = () => {
  toast.configure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { teams, isLoading, isError, message } = useSelector(
    (state) => state.teams,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getTeams());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeam({ name }));
    injectStyle();
    toast.success('Team added!');
    navigate('/dashboard');
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3">Create New Team</h3>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Team
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

export default NewTeam;
