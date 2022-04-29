import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

const HomePageSchedule = ({ games }) => {
  const navigate = useNavigate();

  let date, sortedDate, sortedGames;

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
