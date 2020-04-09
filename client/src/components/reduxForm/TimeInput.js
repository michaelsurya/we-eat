import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { TimeInput as TI } from "semantic-ui-calendar-react";
import moment from "moment";

const TimeInput = (props) => {
  const {
    input: { value, onChange },
    label: label,
    placeholder: placeholder,
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
    </Form.Field>
  );
};
export default TimeInput;
