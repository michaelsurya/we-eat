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

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!/^.+@.+$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if (!formValues.password) {
    errors.password = "Required";
  }

  return errors;
};

export default reduxForm({ form: "signInForm", validate: validate })(SignInForm);
