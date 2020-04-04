import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";
import PhoneInputField from "../reduxForm/PhoneInput";

class PhoneNumberForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          inline
          name="phoneNumber"
          component={PhoneInputField}
          label="Phone Number"
        />
        <Button type="submit" color="orange">
          Save
        </Button>
      </Form>
    );
  }
}

const validate = ({ firstName, surname, sex, phoneNumber, description }) => {
  const errors = {};

  const numberRegex = /^[0-9]*$/;

  if (phoneNumber) {
    const rawPhoneNumber = phoneNumber.replace(/[^0-9]+/g, "");
    if (!numberRegex.test(rawPhoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }
    if (rawPhoneNumber.length < 8) {
      errors.phoneNumber = "Invalid phone number";
    }
  }

  return errors;
};

export default reduxForm({ form: "phoneNumberForm", validate: validate })(
  PhoneNumberForm
);
