import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStories, reset } from '../store/storySlice';
import { Button, Container } from 'react-bootstrap';
import timeAgo from 'node-time-ago';

const Stories = ({ stories }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { stories, isLoading, isError, message } = useSelector(
  //   (state) => state.stories,
  // );

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   dispatch(getStories());
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [isError, message, dispatch]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Container className="d-flex justify-content-center flex-column">
        <Button
          variant="info"
          onClick={() => {
            navigate('/news');
          }}>
          <h3>Latest News</h3>
        </Button>
        {stories.length > 0 ? (
          <div className="mt-3">
            {[...stories]
              .reverse()
              .filter((_, idx) => idx < stories.length - (stories.length - 3))
              .map((story) => {
                return (
                  <div key={story.id}>
                    <h3>{story.title}</h3>
                    <p>By: {story.author}</p>
                    <p>Date: {timeAgo(story.updatedAt)}</p>
                    <p
                      dangerouslySetInnerHTML={{ __html: story.sanitizedHTML }}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <h3>There are no stories yet...</h3>
        )}
      </Container>
    </div>
  );
};

export default Stories;
