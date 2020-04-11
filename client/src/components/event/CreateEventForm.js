import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

import AllergenOptions from "../reduxForm/AllergenOptions";
import CuisineOptions from "../reduxForm/CuisineOptions";
import DateInput from "../reduxForm/DateInput";
import MultipleSelectionDropdown from "../reduxForm/MultipleSelectionDropdown";
import PhoneInputField from "../reduxForm/PhoneInput";
import PhotosUpload from "../reduxForm/PhotosUpload";
import SexRadioButton from "../reduxForm/SexRadioButton";
import ReadOnlyField from "../reduxForm/ReadOnlyField";
import TextArea from "../reduxForm/TextArea";
import TextField from "../reduxForm/TextField";
import TimeInput from "../reduxForm/TimeInput";
import TagInputField from "../reduxForm/TagInputField";

class CreateEventForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Segment>
        <Form>
          <Field
            name="pictures"
            component={PhotosUpload}
            label="Event pictures* (Max 5)"
          />
          <Field
            name="title"
            component={TextField}
            label="Experience Title*"
            placeholder="e.g Roast Chicken Dinner"
          />
          <Field
            name="location"
            component={TextField}
            label="Location*"
            placeholder="e.g ..."
          />
          <Form.Group widths="equal">
            <Field
              name="date"
              component={DateInput}
              label="Date*"
              placeholder="dd/MM/yyyy"
            />
            <Field
              name="time"
              component={TimeInput}
              label="Time*"
              placeholder="hh:mm"
            />
          </Form.Group>
          <Field
            name="duration"
            component={TextField}
            placeholder="e.g 2 hours"
            label="Approximate duration"
          />
          <Field
            name="guestRequired"
            component={TextField}
            label="Number of guests*"
            placeholder="e.g 5"
          />
          <Field
            name="description"
            component={TextArea}
            label="Event description*"
            placeholder="Tell us more about the event..."
          />
          <Field
            name="cuisine"
            component={MultipleSelectionDropdown}
            label="What type of cuisine are you going to cook?*"
            options={CuisineOptions}
          />
          <Field
            name="allergen"
            component={MultipleSelectionDropdown}
            label="Allergen List*"
            placeholder="Allergen"
            options={AllergenOptions}
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

const validate = ({ pictures }) => {
  const errors = {};

  if (pictures) {
    // Check if user has entered the event pictures
    if (pictures.length < 1) {
      errors.pictures = "At least one pictures is needed";
    }
    // Check if the pictures uploaded are not more than 5
    if (pictures.length > 5) {
      errors.pictures = "Maximum of 5 pictures are allowed";
    }

    return errors;
  }
};

export default reduxForm({ form: "createEventForm", validate: validate })(
  CreateEventForm
);
