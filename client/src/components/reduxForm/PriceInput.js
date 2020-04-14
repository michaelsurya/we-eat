import React from "react";
import { Form } from "semantic-ui-react";
import NumberFormat from "react-number-format";
import styles from "../../assets/css/form.module.css";

const PrinceInput = ({ input, meta, label }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <NumberFormat
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={2}
        defaultValue={0}
        fixedDecimalScale={true}
        onValueChange={(val) => input.onChange(val.value)}
        onFocus={() => console.log("focused")}
        thousandSeparator={true}
        prefix={"£"}
      ></NumberFormat>
      {renderError(meta)}
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;;
  }
}

export default PrinceInput;
