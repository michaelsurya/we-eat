import React from "react";
import { Form } from "semantic-ui-react";

const renderTextArea = ({ input, label, type, meta }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Form.TextArea
        {...input}
        placeholder={label}
        type={type}
        error={renderError(meta)}
      ></Form.TextArea>
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (touched && error) {
    return error;
  }
}

export default renderTextArea;
