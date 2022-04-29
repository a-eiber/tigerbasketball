import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createGame, getGames } from '../../store/gameSlice';
import { getTeams } from '../../store/teamSlice';
import { getGameDays } from '../../store/gameDaySlice';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const NewGame = () => {
  toast.configure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gameDate, setGameDate] = useState('');
  const [time, setTime] = useState('');
  const [teamOne, setTeamOne] = useState('');
  const [teamTwo, setTeamTwo] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { teams } = useSelector((state) => state.teams);
  const { gameDays } = useSelector((state) => state.gameDays);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGames());
    dispatch(getTeams());
    dispatch(getGameDays());
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    injectStyle();

    if (teamOne === teamTwo) {
      toast.error("Can't have the same team play themselves");
    } else {
      dispatch(createGame({ gameDate, time, teamOne, teamTwo }));
      toast.success('Game added!');
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3">Create New Game</h3>
        <Form onSubmit={onSubmit} className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="gameDate">
            <Form.Label>Game Date</Form.Label>
            <Form.Select
              value={gameDate}
              onChange={(e) => setGameDate(e.target.value)}>
              <option value="">Select Game Day</option>
              {gameDays.map((day) => {
                return (
                  <option value={day.date} key={day.id}>
                    {new Date(day.date.replace(/-/g, '/')).toDateString()}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="time">
            <Form.Label>Game Time</Form.Label>
            <Form.Control
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="teamOne">
            <Form.Label>Home Team</Form.Label>
            <Form.Select
              value={teamOne}
              onChange={(e) => setTeamOne(e.target.value)}>
              <option value="">Select Home Team</option>
              {teams.map((team) => {
                return (
                  <option value={team.name} key={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="teamTwo">
            <Form.Label>Away Team</Form.Label>
            <Form.Select
              value={teamTwo}
              onChange={(e) => setTeamTwo(e.target.value)}>
              <option value="">Select Away Team</option>
              {teams.map((team) => {
                return (
                  <option value={team.name} key={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Form.Select>
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

export default NewGame;
