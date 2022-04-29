import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createStory } from '../../store/storySlice';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const AdminStories = () => {
  toast.configure();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStory({ title, author, text }));
    injectStyle();
    toast.success('Story added!');
    navigate('/news');
  };

  return (
    <div>
      <Container>
        <h3 className="text-center mt-3">Create News Alert</h3>
        <Form onSubmit={onSubmit} className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    </div>
  );
};

export default AdminStories;
