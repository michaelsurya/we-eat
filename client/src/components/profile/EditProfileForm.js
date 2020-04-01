import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import LanguageOptions from "../reduxForm/LanguageOptions";
import MultipleSelectionDropdown from "../reduxForm/MultipleSelectionDropdown";
import SexRadioButton from "../reduxForm/SexRadioButton";
import ReadOnlyField from "../reduxForm/ReadOnlyField";
import RenderTextArea from "../reduxForm/RenderTextArea";
import RenderTextField from "../reduxForm/RenderTextField";
import TagInputField from "../reduxForm/TagInputField";

class EditProfileForm extends React.Component {
  onSubmit = formValues => {
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
          <Field
            inline
            name="email"
            component={ReadOnlyField}
            label="Email" 
          />
          <Field
            inline
            name="phoneNumber"
            component={RenderTextField}
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
          <Button type="button" color="orange" fluid onClick={this.props.handleSubmit(this.onSubmit)}>
            Save
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: "editProfileForm" })(EditProfileForm);
