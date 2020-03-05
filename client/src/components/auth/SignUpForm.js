import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";

import styles from "../../assets/css/auth.module.css";

class SignUpForm extends React.Component {
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
        <Form.Group widths="equal">
          <Field
            name="firstName"
            component={this.renderTextField}
            label="First Name"
          />
          <Field
            name="surname"
            component={this.renderTextField}
            label="Surname"
          />
        </Form.Group>
        <Field name="sex" component={sexRadioButton} />
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

const validate = ({
  firstName,
  surname,
  sex,
  email,
  password,
  repeatPassword
}) => {
  const errors = {};

  const nameRegex = /^[a-z ,.'-]+$/i;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;

  // Check if user has entered their first name
  if (!firstName) {
    errors.firstName = "First name is required";
  } else {
    // Check the first name length
    if (firstName.length < 3) {
      errors.firstName = "Invalid length";
    }
    if (!nameRegex.test(firstName)) {
      errors.firstName = "Invalid character";
    }
  }

  // Check if user has entered their surname
  if (!surname) {
    errors.surname = "Surname is required";
  } else {
    // Check the first name length
    if (surname.length < 3) {
      errors.surname = "Invalid length";
    }
    if (!nameRegex.test(surname)) {
      errors.surname = "Invalid character";
    }
  }

  if (!sex) {
    errors.sex = "Please choose one";
  }

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
  // Check if user has entered repeat password
  if (!repeatPassword) {
    errors.repeatPassword = "Required";
  } else if (password !== repeatPassword) {
    errors.repeatPassword = "Password does not match";
  }

  return errors;
};

class sexRadioButton extends React.Component {
  render() {
    const {
      input: { value, onChange },
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Group inline>
        <label>Sex</label>
        <Form.Radio
          label="Male"
          value="M"
          checked={value === "M"}
          onClick={() => onChange("M")}
        />
        <Form.Radio
          label="Female"
          value="F"
          checked={value === "F"}
          onClick={() => onChange("F")}
        />
        {touched && error ? <p className={styles.error}>{error}</p> : null}
      </Form.Group>
    );
  }
}

export default reduxForm({ form: "signUpForm", validate: validate })(
  SignUpForm
);
