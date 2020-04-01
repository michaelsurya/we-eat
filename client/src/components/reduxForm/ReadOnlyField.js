import React from "react";
import { Form } from "semantic-ui-react";

const ReadOnlyField = ({ input, label, type, meta }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Form.Input
        {...input}
        placeholder={input.value}
        type={type}
        error={renderError(meta)}
        readOnly
      ></Form.Input>
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (touched && error) {
    return error;
  }
}

export default ReadOnlyField;
