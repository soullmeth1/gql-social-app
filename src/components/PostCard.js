import React from 'react';
import moment from 'moment';
import { Card, Icon, Label, Button, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GetAuthContext } from '../context/authContext';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard(props) {
  const {
    post: { body, createAt, id, username, likeCount, commentCount, likes },
  } = props;

  const { state } = GetAuthContext();

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description style={{ wordBreak: 'break-all' }}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={state.user} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="teal" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {state.user
          ? state.user.username === username && <DeleteButton postId={id} />
          : null}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
