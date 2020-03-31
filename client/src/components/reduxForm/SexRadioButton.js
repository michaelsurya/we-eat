import React from "react";
import { Form } from "semantic-ui-react";
import styles from "../../assets/css/auth.module.css";

class sexRadioButton extends React.Component {
  render() {
    const {
      input: { value, onChange },
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Group inline>
        <label>Sex</label>
        <Form.Radio
          label="Male"
          value="M"
          checked={value === "M"}
          onClick={() => onChange("M")}
        />
        <Form.Radio
          label="Female"
          value="F"
          checked={value === "F"}
          onClick={() => onChange("F")}
        />
        {touched && error ? <p className={styles.error}>{error}</p> : null}
      </Form.Group>
    );
  }
}

export default sexRadioButton;
