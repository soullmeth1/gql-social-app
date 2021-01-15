import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { GetAuthContext } from '../context/authContext';
import { useFormHooks } from '../utils/Hooks';

function Login(props) {
  const { values, onChange, onSubmit } = useFormHooks(cb, {
    username: '',
    password: '',
  });
  const [action, { loading }] = useMutation(LOGIN_USER);
  const [errors, setErrors] = useState({});
  const { login } = GetAuthContext();

  function cb() {
    action({ variables: values })
      .then((res) => {
        console.log(res);
        login(res.data.login);
        props.history.push('/');
      })
      .catch((err) => {
        console.log({ err });
        setErrors({
          name:
            err.graphQLErrors[0].message !== 'Errors'
              ? err.graphQLErrors[0].message
              : err.graphQLErrors[0].extensions.code,
          details: err.graphQLErrors[0].extensions.errors,
        });
      });
  }

  // console.log(useMutation);

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          fluid
          label="User name"
          placeholder="User name"
          name="username"
          error={errors.details?.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          fluid
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          error={errors.details?.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length ? (
        <Message
          error
          header={errors.name || 'Something went wrong!'}
          list={
            errors.details &&
            Object.values(errors?.details).map((value) => value)
          }
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default Login;

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createAt
      token
    }
  }
`;
