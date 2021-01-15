import { gql, useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  Popup,
} from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { GetAuthContext } from '../context/authContext';
import { useFormHooks } from '../utils/Hooks';

function Post(props) {
  const { state } = GetAuthContext();
  const { data, loading } = useQuery(FETH_POST, {
    variables: { postId: props.match.params.id },
  });
  const [action, { loading: load, error }] = useMutation(CREATE_COMMENT);
  const { values, onChange, onSubmit } = useFormHooks(callBackComment, {
    body: '',
  });

  function callBackComment() {
    action({
      variables: { postId: props.match.params.id, body: values.body },
      context: { headers: { Authorization: `Bearer ${state.user?.token}` } },
      update() {
        values.body = '';
      },
    }).catch((err) => console.log({ err }));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
  }

  const {
    id,
    body,
    username,
    createAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = data?.getPost;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            size="small"
            floated="right"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta as={Link} to={`/posts/${id}`}>
                {moment(createAt).fromNow(true)}
              </Card.Meta>
              <Card.Description style={{ wordBreak: 'break-all' }}>
                {body}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <LikeButton user={state.user} post={{ id, likeCount, likes }} />
              <Popup
                inverted
                content="Comment on post"
                trigger={
                  <Button labelPosition="right" as={'div'}>
                    <Button color="teal" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                }
              />
              {state.user && state.user.username === username && (
                <DeleteButton
                  postId={id}
                  callback={() => props.history.push('/')}
                />
              )}
            </Card.Content>
          </Card>
          {state.user && (
            <Card fluid>
              <Card.Content>
                <Form onSubmit={onSubmit} loading={load}>
                  <h3>Post a comment</h3>
                  <Form.Field className="action fluid">
                    <Form.Input
                      action="Send"
                      placeholder="Your Post"
                      name="body"
                      value={values.body || ''}
                      error={error ? true : false}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </Form.Field>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {state.user && state.user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createAt).fromNow(true)}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Post;

const FETH_POST = gql`
  query ViewPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createAt
      likeCount
      commentCount
      likes {
        id
        username
      }
      comments {
        id
        username
        body
        createAt
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        username
        body
        createAt
      }
    }
  }
`;
