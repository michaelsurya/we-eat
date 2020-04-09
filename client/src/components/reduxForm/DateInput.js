import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { DateInput as DI } from "semantic-ui-calendar-react";
import moment from "moment";

const DateInput = (props) => {
  const {
    input: { value, onChange },
    label: label,
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
        iconPosition="left"
        minDate={moment().add(1, "days")}
        onChange={(e, { value }) => onChange(value)}
        placeholder={placeholder}
        preserveViewMode={false}
        value={value}
      ></DI>
    </Form.Field>
  );
};
export default DateInput;
