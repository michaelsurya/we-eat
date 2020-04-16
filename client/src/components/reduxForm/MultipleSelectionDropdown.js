import React from "react";
import { Dropdown, Form } from "semantic-ui-react";
import styles from "../../assets/css/form.module.css";

const MultipleSelectionDropdown = (props) => {
  const {
    input: { value, onChange },
    label,
    meta,
    options,
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      {renderError(meta)}
      <Dropdown
        placeholder={label}
        fluid
        multiple
        selection
        search
        options={options}
        defaultValue={value}
        onChange={(e, { value }) => onChange(value)}
      ></Dropdown>
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
}

export default MultipleSelectionDropdown;
