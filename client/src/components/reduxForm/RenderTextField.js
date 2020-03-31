import React from "react";
import { Form } from "semantic-ui-react";

const renderTextField = ({ input, label, type, meta }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Form.Input
        {...input}
        placeholder={label}
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

export default renderTextField;
