import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";

class SignInForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return error;
    }
  }

  renderTextField = ({ input, label, type, meta }) => {
    return (
      <Form.Field>
        <label>{label}</label>
        <Form.Input
          {...input}
          placeholder={label}
          type={type}
          error={this.renderError(meta)}
        ></Form.Input>
      </Form.Field>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="email" component={this.renderTextField} label="Email" />
        <Field
          name="password"
          component={this.renderTextField}
          label="Password"
          type="password"
        />
        <Button type="submit" color="orange">
          Log in
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

  // Check if user has entered password
  if (!password) {
    errors.password = "Required";
  } else if (password.length < 8) {
    errors.password = "Password needs to be at least 8 characters";
  }

  return errors;
};

export default reduxForm({ form: "signInForm", validate: validate })(
  SignInForm
);
