import { useQuery } from '@apollo/client';
import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/grahpql';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column className="page-title">
            <h1>Recent Posts</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <PostForm />
          </Grid.Column>

          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {data?.getPosts
                ? data.getPosts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))
                : null}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
