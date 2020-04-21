import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { Button, Form, Segment } from "semantic-ui-react";

import AllergenOptions from "../reduxForm/AllergenOptions";
import CuisineOptions from "../reduxForm/CuisineOptions";
import DateInput from "../reduxForm/DateInput";
import Map from "../reduxForm/Map";
import MenuInput from "../reduxForm/MenuInput";
import MultipleSelectionDropdown from "../reduxForm/MultipleSelectionDropdown";
import PhotosUpload from "../reduxForm/PhotosUpload";
import PriceInput from "../reduxForm/PriceInput";
import TextArea from "../reduxForm/TextArea";
import TextField from "../reduxForm/TextField";
import TimeInput from "../reduxForm/TimeInput";

class CreateEventForm extends React.Component {
  state = { lat: null, lng: null };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }

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
            component={Map}
            center={{
              lat: this.state.lat ? this.state.lat : 54.966667,
              lng: this.state.lng ? this.state.lng : -1.6,
            }}
            height="300px"
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
          <Form.Group widths="equal">
            <Field
              name="guestRequired"
              component={TextField}
              label="Number of guests*"
              type="number"
              placeholder="e.g 5"
            />
            <Field
              name="price"
              component={PriceInput}
              label="Price per guest*"
            />
          </Form.Group>
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
            label="Allergen List"
            placeholder="Allergen"
            options={AllergenOptions}
          />
          <FieldArray name="menu" component={MenuInput}></FieldArray>
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

const validate = ({
  pictures,
  title,
  location,
  date,
  time,
  duration,
  guestRequired,
  price,
  description,
  cuisine,
  menu,
}) => {
  const errors = {};

  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const guestRequiredRegex = /^[1-9]\d*$/;
  const timeRegex = /^\d{2}:\d{2}$/;

  if (!title) {
    errors.title = "Title is required";
  }
  // Check the title length
  else if (title.length < 10 || title.length > 75) {
    errors.title = "Invalid length";
  }

  if (!date) {
    errors.date = "Date is required";
  } else if (!dateRegex.test(date)) {
    errors.date = "Invalid date format";
  }

  if (!time) {
    errors.time = "Time is required";
  } else if (!timeRegex.test(time)) {
    errors.time = "Invalid time format";
  }

  if (duration && duration.length > 20) {
    errors.duration = "Invalid length";
  }

  if (!guestRequired) {
    errors.guestRequired =
      "Please enter the number of guest required for the event";
  } else if (!guestRequiredRegex.test(guestRequired)) {
    errors.guestRequired = "Invalid number";
  }

  if (!price) {
    errors.price = "Please enter the event price";
  }

  if (!description) {
    errors.description = "Title is required";
  }
  // Check the title length
  else if (description.length < 25 || description.length > 500) {
    errors.description = "Invalid length";
  }

  if (!cuisine || cuisine.length < 1) {
    errors.cuisine = "Please select at least one cuisine";
  }

  if (pictures) {
    // Check if user has entered the event pictures
    if (pictures.length < 1) {
      errors.pictures = "At least one pictures is needed";
    }
    // Check if the pictures uploaded are not more than 5
    if (pictures.length > 5) {
      errors.pictures = "Maximum of 5 pictures are allowed";
    }
  }

  if (menu) {
    // Check if user has entered at least one menu
    if (menu.length < 1) {
      errors.menu = { _error: "At least one menu must be entered" };
    }
  }
  return errors;
};

export default reduxForm({ form: "createEventForm", validate: validate })(
  CreateEventForm
);
