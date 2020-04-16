import React from "react";
import { Form } from "semantic-ui-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

import styles from "../../assets/css/profile.module.css";

const PhoneInputField = (props) => {
  const {
    input: { value, onChange },
    label,
    meta: { touched, error },
  } = props;
  return (
    <>
        <Form.Field>
          <label>{label}</label>
          <PhoneInput
            inputClass={styles.phone_input}
            country={"gb"}
            value={value}
            onChange={(phone) => onChange(phone)}
          />
        </Form.Field>
        {touched && error ? <p className={styles.error}>{error}</p> : null}
    </>
  );
};

export default PhoneInputField;
