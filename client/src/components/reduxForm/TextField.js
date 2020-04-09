import React from "react";
import { Form } from "semantic-ui-react";

const TextField = ({ input, label, type, meta, placeholder }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Form.Input
        {...input}
        placeholder={placeholder ? placeholder : label}
        type={type}
        error={renderError(meta)}
      ></Form.Input>
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (touched && error) {
    return error;
  }
}

export default TextField;
