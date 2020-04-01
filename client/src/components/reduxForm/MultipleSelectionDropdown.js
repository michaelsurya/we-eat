import React from "react";
import { Dropdown, Form } from "semantic-ui-react";

const MultipleSelectionDropdown = props => {
  const {
    input: { value, onChange },
    label: label,
    meta: meta,
    options: options
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown
        placeholder="Skills"
        fluid
        multiple
        selection
        search
        options={options}
        defaultValue={value}
        onChange={(e, { value }) => onChange(value)}
        error={renderError(meta)}
      ></Dropdown>
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (touched && error) {
    return error;
  }
}

export default MultipleSelectionDropdown;
