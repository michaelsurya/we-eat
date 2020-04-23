import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { DateTimeInput as DTI } from "semantic-ui-calendar-react";
import moment from "moment";

const DateTimeInput = (props) => {
  const {
    input: { value, onChange },
    label: label,
    placeholder: placeholder,
    width,
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <DTI
        animation="none"
        clearable
        clearIcon={<Icon name="remove" color="red" />}
        closable
        dateTimeFormat=""
        iconPosition="left"
        minDate={moment().add(1, "days")}
        onChange={(e, { value }) => onChange(value)}
        placeholder={placeholder}
        preserveViewMode={false}
        value={value}
      ></DTI>
    </Form.Field>
  );
};
export default DateTimeInput;
