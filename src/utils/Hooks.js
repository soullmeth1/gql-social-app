import { useState } from 'react';

function useFormHooks(callback = () => {}, initialState = {}) {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    values,
    onChange,
    onSubmit,
  };
}

export { useFormHooks };
