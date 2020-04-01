import React from "react";
import { Form, Input } from "semantic-ui-react";

const InlineTextField = ({ input, label, type, meta }) => {
  return (
    <Form.Field inline>
      <label>{label}</label>
      <Input
        {...input}
        placeholder={label}
        type={type}
        error={renderError(meta)}
      ></Input>
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (touched && error) {
    return error;
  }
}

export default InlineTextField;
