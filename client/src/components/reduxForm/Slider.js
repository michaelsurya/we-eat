import React, { useState } from "react";
import { Form, Header, Label, Grid, GridColumn } from "semantic-ui-react";
import { Slider as SS } from "react-semantic-ui-range";
import styles from "../../assets/css/form.module.css";

const Slider = (props) => {
  const {
    input: { value, onChange },
    label,
    min,
    max,
    step,
  } = props;

  const settings = {
    start: value ? value : [min, max],
    min: min,
    max: max,
    step: step,
    onChange: (value) => onChange(value),
  };

  return (
    <Form.Field width={11}>
      <label>{label}</label>
      <Grid>
        <Grid.Column>
          <Label>£{value ? parseFloat(value[0]).toFixed(1)  : parseFloat(min).toFixed(1) }</Label>
        </Grid.Column>
        <GridColumn></GridColumn>
        <Grid.Column width={11}>
          <SS discrete multiple color="orange" settings={settings} />
        </Grid.Column>
        <GridColumn></GridColumn>
        <Grid.Column>
          <Label className={styles.float_right}>
            £{value ? parseFloat(value[1]).toFixed(1) : parseFloat(max).toFixed(1) }
          </Label>
        </Grid.Column>
      </Grid>
    </Form.Field>
  );
};

export default Slider;
