import { gql, useMutation } from '@apollo/client';
import { Button, Form, Message } from 'semantic-ui-react';
import { GetAuthContext } from '../context/authContext';
import { FETCH_POSTS_QUERY } from '../utils/grahpql';
import { useFormHooks } from '../utils/Hooks';

function PostForm() {
  const { state } = GetAuthContext();
  const { values, onChange, onSubmit } = useFormHooks(cb);

  const [createPost, { loading, error }] = useMutation(query, {
    variables: { body: values.body || '' },
    context: { headers: { Authorization: `Bearer ${state.user?.token}` } },
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      //   console.log(data, result, 'caching');
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = '';
    },
  });

  function cb() {
    createPost().catch((err) => console.log({ err }));
    // console.log(error);
  }

  return (
    <>
      <Form onSubmit={onSubmit} loading={loading}>
        <h3>Create a post : </h3>
        <Form.Field>
          <Form.Input
            placeholder="Your Post"
            name="body"
            value={values.body || ''}
            error={error ? true : false}
            onChange={onChange}
            autoComplete="off"
            style={{ marginBottom: 10 }}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error ? (
        <Message
          error
          header={error.graphQLErrors[0].message}
          style={{ marginBottom: 15 }}
        />
      ) : null}
    </>
  );
}

export default PostForm;

const query = gql`
  mutation NewPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      likeCount
      commentCount
      createAt
      comments {
        id
        username
        body
      }
      likes {
        id
        username
      }
    }
  }
`;
