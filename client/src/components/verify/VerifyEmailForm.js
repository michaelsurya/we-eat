import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";

import TextField from "../reduxForm/TextField";

class VerifyEmailForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="email" component={TextField} label="Email" />
        <Button type="submit" color="orange">
          Send
        </Button>
      </Form>
    );
  }
}

const validate = ({ email, password }) => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;

  // Check if user has entered their email
  if (!email) {
    errors.email = "Email is required";
    // Check if valid email
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  return errors;
};

export default reduxForm({ form: "verifyEmailForm", validate: validate })(
  VerifyEmailForm
);
