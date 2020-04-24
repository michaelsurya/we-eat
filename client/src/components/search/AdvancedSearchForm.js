import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Header, Segment } from "semantic-ui-react";

import styles from "../../assets/css/search.module.css";

import AllergenOptions from "../reduxForm/AllergenOptions";
import CuisineOptions from "../reduxForm/CuisineOptions";
import DateInput from "../reduxForm/DateInput";
import Dropdown from "../reduxForm/Dropdown";
import GooglePlacesInput from "../reduxForm/GooglePlacesInput";
import LanguageOptions from "../reduxForm/LanguageOptions";
import MultipleSelectionDropdown from "../reduxForm/MultipleSelectionDropdown";
import Slider from "../reduxForm/Slider";
import TextField from "../reduxForm/TextField";

const TIME_OPTIONS = [
  { key: "None", text: "None", value: null },
  { key: "6AM-12PM", text: "6AM-12PM", value: ["06:00", "12:00"] },
  { key: "12PM-5PM", text: "12PM-5PM", value: ["12:00", "17:00"] },
  { key: "5PM-11PM", text: "5PM-11PM", value: ["17:00", "23:00"] },
];

class AdvancedSearchForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  
  render() {
    return (
      <Form className={`${styles.top_margin}`}>
        <Form.Group>
          <Field name="location" component={GooglePlacesInput} label="Location" />
          <Field
            name="date"
            component={DateInput}
            label="Date*"
            placeholder="dd/MM/yyyy"
          />
          <Field
            name="time"
            component={Dropdown}
            label="Time"
            options={TIME_OPTIONS}
          ></Field>
          <Field
            name="guestRequired"
            component={TextField}
            label="Max Guests"
            type="number"
          />
          <Field
            name="price"
            component={Slider}
            min={0}
            max={80}
            step={0.5}
            label="Price Range"
          ></Field>
        </Form.Group>
        <Form.Group widths="equal">
        <Field
            name="allergen"
            component={MultipleSelectionDropdown}
            label="Allergen List"
            placeholder="Allergen"
            options={AllergenOptions}
          />
          <Field
            name="cuisine"
            component={MultipleSelectionDropdown}
            label="Cuisine"
            options={CuisineOptions}
          />
          <Field
            name="language"
            component={MultipleSelectionDropdown}
            label="Host Languages"
            options={LanguageOptions}
          />
          <Button compact color="orange" onClick={this.props.handleSubmit(this.onSubmit)}>Search</Button>
        </Form.Group>
      </Form>
    );
  }
}

export default reduxForm({ form: "advancedSearchForm" })(AdvancedSearchForm);
