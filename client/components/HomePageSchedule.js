import React, { useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, reset } from '../store/gameSlice';

const HomePageSchedule = ({ games }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { games, isError, message } = useSelector((state) => state.games);

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   dispatch(getGames());
  //   return () => {
  //     console.log('use effect unmounted, but why?');
  //     dispatch(reset());
  //   };
  // }, [isError, message, dispatch]);

  let date;
  let sortedDate;
  let sortedGames;
  if (games && games.length > 0) {
    sortedGames = [...games].sort((a, b) => {
      const da = new Date(a.gameDate);
      const db = new Date(b.gameDate);
      return da - db;
    });

    date = new Date([...sortedGames].shift().gameDate);
    sortedDate = new Date(date.setDate(date.getDate() + 1)).toDateString(
      'en-US',
    );
  }

  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <Button
          variant="info"
          onClick={() => {
            navigate('/schedule');
          }}>
          <h3>This Week's Schedule</h3>
        </Button>

        <ListGroup className="mt-3">
          <ListGroup.Item className="text-center">{sortedDate}</ListGroup.Item>
        </ListGroup>

        {sortedGames && sortedGames.length > 0 ? (
          <ListGroup className="mt-1">
            {sortedGames.map((game) => {
              let newGameDate = new Date(game.gameDate);
              let updatedGameDate = new Date(
                newGameDate.setDate(newGameDate.getDate() + 1),
              ).toDateString('en-US');

              if (updatedGameDate == sortedDate) {
                return (
                  <ListGroup.Item key={game.id}>
                    {game.time}: {game.teamOne} vs. {game.teamTwo}
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
        ) : (
          'No games available'
        )}
      </Container>
    </div>
  );
};

export default HomePageSchedule;
