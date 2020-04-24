import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Header, Segment } from "semantic-ui-react";

import styles from "../../assets/css/search.module.css";

import DateInput from "../reduxForm/DateInput";
import TextField from "../reduxForm/TextField";

class SearchForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form className={`${styles.top_margin}`}>
        <Field name="location" component={TextField} label="Location" />
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

export default reduxForm({ form: "searchForm" })(SearchForm);
