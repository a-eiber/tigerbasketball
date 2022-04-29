import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createGameDay, getGameDays } from '../../store/gameDaySlice';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const NewGameDay = () => {
  toast.configure();
  injectStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [unformattedDate, setUnformattedDate] = useState('');
  const [gameDate, setGameDate] = useState(new Date());
  const [buttonState, setButtonState] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { gameDays } = useSelector((state) => state.gameDays);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getGameDays());
  }, [user]);

  const onDateChange = (e) => {
    const result = gameDays.map((game) => {
      if (game.date === e.target.value) {
        toast.error('Game day already in the system!');
        return false;
      }
    });
    setButtonState(!result.includes(false));
    setUnformattedDate(e.target.value);
    setGameDate(new Date(e.target.value.replace(/-/g, '/')));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGameDay({ gameDate }));
    toast.success('Game Day added!');
    navigate('/dashboard');
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3">Create New Game Day</h3>
        <Form onSubmit={onSubmit} className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="gameDate">
            <Form.Label>Game Date</Form.Label>
            <Form.Control
              type="date"
              value={unformattedDate}
              onChange={(e) => onDateChange(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!buttonState}>
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

export default NewGameDay;
