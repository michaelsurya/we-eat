import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { DateInput as DI } from "semantic-ui-calendar-react";
import moment from "moment";
import styles from "../../assets/css/form.module.css";

const DateInput = (props) => {
  const {
    input: { value, onChange },
    label: label,
    meta: meta,
    placeholder: placeholder,
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <DI
        animation="none"
        clearable
        clearIcon={<Icon name="remove" color="red" />}
        closable
        dateFormat="DD/MM/YYYY"
        iconPosition="left"
        minDate={moment().add(1, "days")}
        onChange={(e, { value }) => onChange(value)}
        placeholder={placeholder}
        preserveViewMode={false}
        value={value}
      ></DI>
      {renderError(meta)}
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;;
  }
}

export default DateInput;
