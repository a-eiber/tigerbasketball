import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

const HomePageSchedule = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <Button variant="info">
          <h3>This Week's Schedule</h3>
        </Button>

        <ListGroup className="mt-3">
          <ListGroup.Item>May 1st, 2022</ListGroup.Item>
        </ListGroup>

        <ListGroup className="mt-1">
          <ListGroup.Item>5:00pm: Team 1 vs. Team 2</ListGroup.Item>
          <ListGroup.Item>6:00pm: Team 3 vs. Team 4</ListGroup.Item>
          <ListGroup.Item>7:00pm: Team 5 vs. Team 6</ListGroup.Item>
          <ListGroup.Item>8:00pm: Team 7 vs. Team 8</ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
};

export default HomePageSchedule;
