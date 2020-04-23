import React from "react";
import { Dropdown as DD, Form } from "semantic-ui-react";
import styles from "../../assets/css/form.module.css";

const Dropdown = (props) => {
  const {
    input: { onChange },
    label,
    meta,
    options,
  } = props;

  return (
    <Form.Field width={4}>
      <label>{label}</label>
      {renderError(meta)}
      <DD
        placeholder={label}
        fluid
        selection
        options={options}
        onChange={(e, { value }) => onChange(value)}
      ></DD>
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
}

export default Dropdown;
