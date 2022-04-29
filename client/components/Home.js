import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import About from './About';
import Bottom from './Bottom';
import Headline from './Headline';
import HomePageSchedule from './HomePageSchedule';
import Stories from './Stories';
import { getGames } from '../store/gameSlice';
import { getStories } from '../store/storySlice';

const Home = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);
  const { stories } = useSelector((state) => state.stories);

  useEffect(() => {
    dispatch(getStories());
    dispatch(getGames());
  }, []);

  return (
    <div className="mb-4">
      <Container>
        <Headline />
        <Row>
          <Col md={true} className="mt-3">
            <Stories stories={stories} />
          </Col>
          <Col md={true} className="mt-3">
            <HomePageSchedule games={games} />
          </Col>
        </Row>
        <About />
        <Bottom />
      </Container>
    </div>
  );
};

export default Home;
