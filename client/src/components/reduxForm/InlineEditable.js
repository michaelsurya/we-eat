import React, { useState } from "react";
import { Button, Form, Grid, Label } from "semantic-ui-react";

const InlineEditable = ({ label, onChange, value }) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderInput = () => {
    return (
      <Grid>
        <Grid.Column width="14">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          ></input>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Button as={Label} onClick={() => setIsEditing(false)}>
            Done
          </Button>
        </Grid.Column>
      </Grid>
    );
  };

  const renderValue = () => {
    return (
      <Grid columns="equal">
        <Grid.Column>
          <p>{value}</p>
        </Grid.Column>
        <Grid.Column floated="right" textAlign="right">
          <Button as={Label} onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <Form.Field>
      <label>{label}</label>
      {isEditing ? renderInput() : renderValue()}
    </Form.Field>
  );
};

export default InlineEditable;
