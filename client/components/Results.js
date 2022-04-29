import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDays } from '../store/gameDaySlice';
import { deleteGame } from '../store/gameSlice';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { toast } from 'react-toastify';

const Results = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  const { gameDays } = useSelector((state) => state.gameDays);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGameDays());
  }, [toggle]);

  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <h1 className="text-center mt-3">Results</h1>
        {gameDays.length > 0 ? (
          gameDays.map((day) => {
            let actualDate;
            {
              const initialDate = new Date(day.date);
              const day2 = new Date(initialDate).setDate(
                initialDate.getDate() + 1,
              );
              actualDate = new Date(day2).toDateString('en-US');
            }
            return (
              <div key={day.id} className="mb-5">
                <h3 className="text-center mt-3">{actualDate}</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Home Team</th>
                      <th>Score</th>
                      <th>Away Team</th>
                      <th>Score</th>
                      {user && user.isAdmin && <th>Admin Only</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {day.games &&
                      day.games.map((game) => {
                        return game.teamOneScore >= game.teamTwoScore ? (
                          <tr key={game.id}>
                            <td className="fw-bold">{game.teamOne}</td>
                            <td className="fw-bold">{game.teamOneScore}</td>
                            <td>{game.teamTwo}</td>
                            <td>{game.teamTwoScore}</td>
                            {user && user.isAdmin && (
                              <td>
                                <Button
                                  className="btn btn-danger"
                                  onClick={async () => {
                                    await dispatch(deleteGame(game.id));
                                    injectStyle();
                                    toast.info('Game Deleted');
                                    setToggle(!toggle);
                                  }}>
                                  <FaTrash />
                                </Button>
                              </td>
                            )}
                          </tr>
                        ) : (
                          <tr key={game.id}>
                            <td>{game.teamOne}</td>
                            <td>{game.teamOneScore}</td>
                            <td className="fw-bold">{game.teamTwo}</td>
                            <td className="fw-bold">{game.teamTwoScore}</td>
                            {user && user.isAdmin && (
                              <td>
                                <Button
                                  className="btn btn-danger"
                                  onClick={async () => {
                                    await dispatch(deleteGame(game.id));
                                    injectStyle();
                                    toast.info('Game Deleted');
                                    setToggle(!toggle);
                                  }}>
                                  <FaTrash />
                                </Button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            );
          })
        ) : (
          <p>No Results...</p>
        )}
      </Container>
    </div>
  );
};

export default Results;
