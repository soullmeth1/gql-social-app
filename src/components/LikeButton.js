import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function LikeButton({ post: { id, likeCount, likes }, user }) {
  const [like, setLike] = useState(false);
  const [action] = useMutation(ADD_LIKE);

  useEffect(() => {
    if (
      user &&
      likes.find((val) => {
        return val.username === user?.username;
      })
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likes, user]);

  function handleLike() {
    // setLike(!like);
    action({
      variables: { postId: id },
      context: { headers: { Authorization: `Bearer ${user?.token}` } },
    });
  }

  const likeButton = user ? (
    like ? (
      <Button color="teal" onClick={handleLike}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic onClick={handleLike}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      inverted
      content={`${like ? 'unlike' : 'like'}`}
      trigger={
        <Button as="div" labelPosition="right">
          {likeButton}
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

export default LikeButton;

const ADD_LIKE = gql`
  mutation AddLike($postId: ID!) {
    likePost(postId: $postId) {
      id
      username
      body
      likeCount
      createAt
      likes {
        id
        username
      }
    }
  }
`;
