import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Stories from './Stories';

const Home = () => {
  return (
    <div>
      <Container>
        <h1 className="text-center mt-2">2nd Grade Boys Basketball League</h1>
        <h4 className="text-center mt-2">
          Tiger Sports Programs is proud to be starting a 2nd Grade boys
          basketball league at the Chabad of Port Washington, starting in
          October 2022. This is just additional text that will be changed at a
          later date.
        </h4>
        <Row>
          <Col className="text-center mt-3">
            <Stories />
          </Col>
          <Col className="text-center mt-3">
            <Button variant="info">
              <h3>This Week's Schedule</h3>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
