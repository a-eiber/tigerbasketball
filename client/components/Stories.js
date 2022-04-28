import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStories, reset } from '../store/storySlice';

const Stories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stories, isLoading, isError, message } = useSelector(
    (state) => state.stories,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getStories());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {stories.length > 0 ? (
        <div className="mt-3">
          {[...stories]
            .reverse()
            .filter((_, idx) => idx < stories.length - 5)
            .map((story) => {
              return (
                <div key={story.id}>
                  <h3>{story.title}</h3>
                  <p>By: {story.author}</p>
                  <p>{story.text}</p>
                </div>
              );
            })}
        </div>
      ) : (
        <h3>There are no stories yet...</h3>
      )}
    </div>
  );
};

export default Stories;
