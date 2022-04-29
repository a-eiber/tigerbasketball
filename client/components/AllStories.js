import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStories, deleteStory } from '../store/storySlice';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import timeAgo from 'node-time-ago';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const AllStories = () => {
  toast.configure();
  const dispatch = useDispatch();

  const { stories } = useSelector((state) => state.stories);
  const { user } = useSelector((state) => state.auth);

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    dispatch(getStories());
  }, [toggle]);

  return (
    <div>
      <Container>
        <h1 className="text-center mt-3">Latest News</h1>
        {stories.length > 0 ? (
          <div className="mt-3">
            {[...stories].reverse().map((story) => {
              return (
                <div key={story.id}>
                  <h3>{story.title}</h3>
                  <p>By: {story.author}</p>
                  <p>Date: {timeAgo(story.updatedAt)}</p>
                  <p
                    dangerouslySetInnerHTML={{ __html: story.sanitizedHTML }}
                  />

                  {user && user.isAdmin && (
                    <Button
                      className="btn btn-danger"
                      onClick={async () => {
                        await dispatch(deleteStory(story.id));
                        injectStyle();
                        toast.info('Story deleted!');
                        setToggle(!toggle);
                      }}>
                      Delete
                    </Button>
                  )}
                  <hr />
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

export default AllStories;
