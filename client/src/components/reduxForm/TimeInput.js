import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { TimeInput as TI } from "semantic-ui-calendar-react";
import styles from "../../assets/css/form.module.css";

const TimeInput = (props) => {
  const {
    input: { value, onChange },
    label,
    meta,
    placeholder,
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <TI
        animation="none"
        clearable
        closable
        clearIcon={<Icon name="remove" color="red" />}
        iconPosition="left"
        onChange={(e, { value }) => onChange(value)}
        placeholder={placeholder}
        popupPosition="bottom left"
        value={value}
      ></TI>
      {renderError(meta)}
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
}
export default TimeInput;
