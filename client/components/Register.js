import React from 'react';
import { useForm } from './HelperFunctions';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPlayer } from '../store/playerSlice';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const Register = () => {
  toast.configure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, handleChange] = useForm({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    grade: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    fathersName: '',
    fathersPhone: '',
    fathersEmail: '',
    mothersName: '',
    mothersPhone: '',
    mothersEmail: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlayer({ values }));
    injectStyle();
    toast.success('Player Registered!');
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-center mt-3">Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-block">
          <Form.Label>Player Last Name</Form.Label>
          <Form.Control
            name="lastName"
            value={values.lastName}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Player First Name</Form.Label>
          <Form.Control
            name="firstName"
            value={values.firstName}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Player Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Player Grade as of October 1, 2022</Form.Label>
          <Form.Control
            type="number"
            name="grade"
            value={values.grade}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            name="streetAddress"
            value={values.streetAddress}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={values.city}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>State</Form.Label>
          <Form.Control
            name="state"
            value={values.state}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            name="zip"
            value={values.zip}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Father's Name</Form.Label>
          <Form.Control
            name="fathersName"
            value={values.fathersName}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Father's Phone Number</Form.Label>
          <Form.Control
            name="fathersPhone"
            value={values.fathersPhone}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Father's Email Address</Form.Label>
          <Form.Control
            type="email"
            name="fathersEmail"
            value={values.fathersEmail}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Mothers's Name</Form.Label>
          <Form.Control
            name="mothersName"
            value={values.mothersName}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Mother's Phone Number</Form.Label>
          <Form.Control
            name="mothersPhone"
            value={values.mothersPhone}
            onChange={handleChange}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 d-block">
          <Form.Label>Mother's Email Address</Form.Label>
          <Form.Control
            type="email"
            name="mothersEmail"
            value={values.mothersEmail}
            onChange={handleChange}></Form.Control>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button size="lg" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
