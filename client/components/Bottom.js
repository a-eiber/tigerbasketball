import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Bottom = () => {
  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col className="text-center">
            <h3>Contact Information</h3>
            <p>League Director: Bruce Eiber</p>
            <a href="tel:917-225-7576">Cell: 917-225-7576</a>
            <br />
            <a href="mailto:bruceeiber@gmail.com">
              Email: BruceEiber@gmail.com
            </a>
          </Col>
          <Col className="text-center">
            <h3>Location Information</h3>
            <address>
              Chabad Port Washington <br /> 80 Shore Road <br />
              Port Washington, NY 11050, US
            </address>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=80+Shore+Road+Port+Washington+NY+11050"
              target="_blank"
              rel="noreferrer noopener">
              Get Google Maps Directions
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Bottom;
