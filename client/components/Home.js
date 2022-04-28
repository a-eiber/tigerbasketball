import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import About from './About';
import Bottom from './Bottom';
import Headline from './Headline';
import HomePageSchedule from './HomePageSchedule';
import Stories from './Stories';

const Home = () => {
  return (
    <div className="mb-4">
      <Container>
        <Headline />
        <Row>
          <Col md={true} className="mt-3">
            <Stories />
          </Col>
          <Col md={true} className="mt-3">
            <HomePageSchedule />
          </Col>
        </Row>
        <About />
        <Bottom />
      </Container>
    </div>
  );
};

export default Home;
