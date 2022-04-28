import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <h1 className="text-center mt-2">2nd Grade Boys Basketball League</h1>
      <h4 className="text-center mt-2">
        Tiger Sports Programs is proud to be starting a 2nd Grade boys
        basketball league at the Chabad of Port Washington, starting in October
        2022. This is just additional text that will be changed at a later date.
      </h4>
      <Row>
        <Col className="text-center">
          <h3>Latest News</h3>
        </Col>
        <Col className="text-center">
          <h3>This Week's Schedule</h3>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
