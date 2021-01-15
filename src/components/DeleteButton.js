import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm, Icon, Popup } from 'semantic-ui-react';
import { GetAuthContext } from '../context/authContext';
import { FETCH_POSTS_QUERY } from '../utils/grahpql';

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
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

function DeleteButton(props) {
  const { postId, commentId } = props;
  const [action] = useMutation(commentId ? DELETE_COMMENT : DELETE_POST);
  const { state } = GetAuthContext();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    action({
      variables: { postId, commentId },
      context: { headers: { Authorization: `Bearer ${state.user?.token}` } },
      update(cache) {
        if (!commentId) {
          const data = cache.readQuery({
            query: FETCH_POSTS_QUERY,
          });
          cache.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
              getPosts: data.getPosts.filter((val) => val.id !== postId),
            },
          });
        }
        setOpen(false);
        props.callback && props.callback();
      },
    });
  };

  return (
    <>
      <Popup
        inverted
        content={commentId ? 'Delete comment' : 'Delete post'}
        trigger={
          <Button
            as="div"
            color="red"
            onClick={() => setOpen(true)}
            floated="right"
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteButton;
