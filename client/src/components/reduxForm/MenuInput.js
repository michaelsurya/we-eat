import React from "react";
import { Field } from "redux-form";
import {
  Button,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import TextArea from "./TextArea";
import TextField from "./TextField";

import styles from "../../assets/css/form.module.css";

const MenuInput = ({ fields, meta }) => {
  return (
    <Form.Field>
      <Header as="h5">Menu</Header>
      {renderError(meta)}
      {fields.map((menu, index) => (
        <Segment key={index}>
          <Header as="h5" floated="left">
            Menu {index + 1}
          </Header>
          <Button icon floated="right" onClick={() => fields.remove(index)}>
            <Icon name="close" color="red"></Icon>
          </Button>

          <Field
            name={`${menu}.name`}
            type="text"
            component={TextField}
            label="Menu name"
          />
          <Field
            name={`${menu}.description`}
            component={TextArea}
            label="Menu decription"
          />
        </Segment>
      ))}
      <Button icon labelPosition="left" onClick={() => fields.push({})}>
        <Icon name="add" color="orange" />
        Add Menu
      </Button>
    </Form.Field>
  );
};

function renderError({ error }) {
  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
}

export default MenuInput;
