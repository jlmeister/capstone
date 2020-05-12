import { useState } from 'react';


// this is interesting but it doesn't seem to obey rules of controlled components. need to find a better way.

const useForm = (onSubmitCallback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    onSubmitCallback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return { handleChange, handleSubmit, values }
};

export default useForm