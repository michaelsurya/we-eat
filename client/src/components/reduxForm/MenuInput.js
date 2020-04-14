import React from "react";
import { Field } from "redux-form";
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import TextArea from "./TextArea";
import TextField from "./TextField";

const MenuInput = ({ fields, meta }) => {
  return (
    <Form.Field>
      <Header as="h5">Menu</Header>

      {fields.map((menu, index) => (
        <Segment key={index}>
          <Header as="h5" floated="left">
            Menu {index + 1}
          </Header>
          <Button icon floated="right">
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
      <Button
        icon
        labelPosition="left"
        onClick={() => fields.push({})}
      >
        <Icon name="add" color="orange"/>
        Add Menu
      </Button>
    </Form.Field>
  );
};

export default MenuInput;
