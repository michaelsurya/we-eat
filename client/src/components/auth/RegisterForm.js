import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Message } from "semantic-ui-react";

class RegisterForm extends React.Component {
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
        <Field name="name" component={this.renderTextField} label="Full Name" />
        <Field name="email" component={this.renderTextField} label="Email" />
        <Field
          name="password"
          component={this.renderTextField}
          label="Password"
          type="password"
        />
        <Field
          name="repeatPassword"
          component={this.renderTextField}
          label="Confirm Password"
          type="password"
        />
        <Button type="submit" color="orange">
          Sign up
        </Button>
      </Form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    // Check if user has not enter their name
    errors.name = "Name is required";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^.+@.+$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if (!formValues.password) {
    errors.password = "Required";
  } else if (!formValues.repeatPassword) {
    errors.repeatPassword = "Required";
  } else if (formValues.password !== formValues.repeatPassword) {
    errors.repeatPassword = "Password does not match";
  }
  return errors;
};

export default reduxForm({ form: "registerForm", validate: validate })(
  RegisterForm
);
