import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, reset, deleteGame } from '../store/gameSlice';
import { Button, Container, Table } from 'react-bootstrap';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Schedule = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);

  const { games, isLoading, isError, message } = useSelector(
    (state) => state.games,
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGames());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, toggle]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <h1 className="text-center mt-3">Schedule</h1>
        {games.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Teams</th>
                {user && user.isAdmin && <th>Admin Only</th>}
              </tr>
            </thead>
            <tbody>
              {[...games]
                .sort((a, b) => {
                  let da = new Date(a.gameDate),
                    db = new Date(b.gameDate);
                  return da - db;
                })
                .map((game) => {
                  const day = new Date(game.gameDate);
                  const day2 = new Date(day).setDate(day.getDate() + 1);
                  const date = new Date(day2);
                  return (
                    <tr key={game.id}>
                      <td>{date.toDateString('en-US')}</td>
                      <td>{game.time}</td>
                      <td>
                        {game.teamOne} vs. {game.teamTwo}
                      </td>
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
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default Schedule;
