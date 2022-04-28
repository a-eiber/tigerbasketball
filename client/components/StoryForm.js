import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStory } from '../store/storySlice';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const StoryForm = () => {
  toast.configure();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStory({ title, author, text }));
    injectStyle();
    toast.success('Story added!');
    setTitle('');
    setAuthor('');
    setText('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="text">Story Text</label>
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Story</button>
      </form>
    </div>
  );
};

export default StoryForm;