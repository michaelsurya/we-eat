import React from "react";
import { Dropdown, Form } from "semantic-ui-react";

const MultipleSelectionDropdown = props => {
  const {
    input: { value, onChange },
    label: label,
    meta: { touched, error },
    options: options,
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
        onChange={(e, { value }) => onChange(value)}
      ></Dropdown>
    </Form.Field>
  );
};

export default MultipleSelectionDropdown;
