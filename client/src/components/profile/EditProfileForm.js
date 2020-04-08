import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Segment } from "semantic-ui-react";

import LanguageOptions from "../reduxForm/LanguageOptions";
import MultipleSelectionDropdown from "../reduxForm/MultipleSelectionDropdown";
import PhoneInputField from "../reduxForm/PhoneInput";
import SexRadioButton from "../reduxForm/SexRadioButton";
import ReadOnlyField from "../reduxForm/ReadOnlyField";
import RenderTextArea from "../reduxForm/TextArea";
import RenderTextField from "../reduxForm/TextField";
import TagInputField from "../reduxForm/TagInputField";

import PhotoUpload from "../reduxForm/PhotoUpload";

class EditProfileForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Field
              name="firstName"
              component={RenderTextField}
              label="First Name"
            />
            <Field name="surname" component={RenderTextField} label="Surname" />
          </Form.Group>
          <Field name="sex" component={SexRadioButton} />
          <Field inline name="email" component={ReadOnlyField} label="Email" />
          <Field
            inline
            name="phoneNumber"
            component={PhoneInputField}
            label="Phone Number"
          />
          <Field
            name="description"
            component={RenderTextArea}
            label="Description"
          />
          <Field
            name="languages"
            component={MultipleSelectionDropdown}
            label="Languages you speak"
            options={LanguageOptions}
          />
          <Field
            name="interests"
            component={TagInputField}
            label="Your Interests"
          />
          <Button
            type="button"
            color="orange"
            fluid
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            Save
          </Button>
        </Form>
      </Segment>
    );
  }
}

const validate = ({ firstName, surname, sex, phoneNumber, description }) => {
  const errors = {};

  const nameRegex = /^[a-z ,.'-]+$/i;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;
  const numberRegex = /^[0-9]*$/;

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

  if (description && description.length > 500) {
    errors.description = "Maximum description length is 500 characters";
  }

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

export default reduxForm({ form: "editProfileForm", validate: validate })(
  EditProfileForm
);
