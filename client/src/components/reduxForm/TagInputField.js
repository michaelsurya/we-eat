import React from "react";
import { Form, Icon, Input, Label } from "semantic-ui-react";

const TagInputField = props => {
  const {
    input: { value, onChange },
    label: label
  } = props;

  const addTag = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      onChange([...value, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTag = index => {
    onChange([...value.filter(tag => value.indexOf(tag) !== index)]);
  };

  const renderTagLabels = () => {
    if (value) {
      return value.map((tag, index) => (
        <Label key={index} size="large">
          {tag}
          <Icon name="delete" onClick={() => removeTag(index)} />
        </Label>
      ));
    }
  };

  return (
    <Form.Field>
      <label>{label}</label>
      <Label.Group>{renderTagLabels()}</Label.Group>
      <Form.Input
        placeholder="Place enter to add tags"
        onKeyUp={e => addTag(e)}
      />
    </Form.Field>
  );
};

export default TagInputField;
