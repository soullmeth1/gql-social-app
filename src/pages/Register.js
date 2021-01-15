import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { useFormHooks } from '../utils/Hooks';

function Register(props) {
  const init = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { values, onChange, onSubmit } = useFormHooks(cb, init);
  const [action, { loading }] = useMutation(REGISTER_USER);
  const [errors, setErrors] = useState({});

  function cb() {
    action({ variables: values })
      .then((res) => {
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

  //   console.log(errors);

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          error={errors.details?.email ? true : false}
          value={values.email}
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
        <Form.Input
          fluid
          label="Confirm password"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          error={errors.details?.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

export default Register;

const REGISTER_USER = gql`
  mutation Regis(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createAt
      token
    }
  }
`;
