import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";

import styles from "../../assets/css/search.module.css";

import DateInput from "../reduxForm/DateInput";
import GooglePlacesInput from "../reduxForm/GooglePlacesInput";
import TextField from "../reduxForm/TextField";

class SearchForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form className={`${styles.top_margin}`}>
        <Field
          name="location"
          component={GooglePlacesInput}
          label="Location"
          width={16}
        />
        <Form.Group>
          <Field
            name="date"
            component={DateInput}
            label="Date*"
            placeholder="dd/MM/yyyy"
          />
          <Field
            name="guestRequired"
            component={TextField}
            label="Max Guests"
            type="number"
          />
        </Form.Group>
        <Button
          color="orange"
          fluid
          onClick={this.props.handleSubmit(this.onSubmit)}
        >
          Search
        </Button>
      </Form>
    );
  }
}

const validate = ({ location }) => {
  const errors = {};

  if (!location) {
    errors.location = "Location is required";
  }

  return errors;
};

export default reduxForm({ form: "searchForm", validate: validate })(
  SearchForm
);
