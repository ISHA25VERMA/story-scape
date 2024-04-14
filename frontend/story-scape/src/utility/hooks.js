import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValue] = useState(initialState);

  const onChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
