import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

const About = () => {
  return (
    <div>
      <h1 className="text-center mt-4">About</h1>
      <CardGroup>
        <Card>
          <Card.Img src="https://www.tigersportsprograms.com/uploads/b/0fe0adae481c023a1c6d7ffaef745dc672ca7f9c3b0a9910880487d00ed8887f/IMG_6788_1616690224.JPG?width=800" />
        </Card>
        <Card>
          <Card.Img src="https://www.tigersportsprograms.com/uploads/b/0fe0adae481c023a1c6d7ffaef745dc672ca7f9c3b0a9910880487d00ed8887f/IMG_6788_1616690224.JPG?width=800" />
        </Card>
        <Card>
          <Card.Img src="https://www.tigersportsprograms.com/uploads/b/0fe0adae481c023a1c6d7ffaef745dc672ca7f9c3b0a9910880487d00ed8887f/IMG_6788_1616690224.JPG?width=800" />
        </Card>
      </CardGroup>
      {/* <Row>
        <Col>
          <div className="card" style={{ width: '18rem' }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default About;
