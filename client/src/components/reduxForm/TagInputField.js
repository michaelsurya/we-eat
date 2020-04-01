import React, { useEffect } from "react";
import TagsInput from "react-tagsinput";
import { Form, Icon, Input, Label } from "semantic-ui-react";

const TagInputField = props => {
  // React Hooks here
  const [tags, setTags] = React.useState([]);
  const {
    input: { value, onChange },
    label: label,
    meta: { touched, error },
    options: options
  } = props;

  const addTag = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTag = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  // Synchronise the state to redux form value
  useEffect(() => {
    onChange(tags);
  }, [tags]);

  return (
    <div>
      <Form.Field>
        <label>{label}</label>
      </Form.Field>
      <Label.Group>
        {tags.map((tag, index) => (
          <Label key={index}>
            {tag}
            <Icon name="delete" onClick={() => removeTag(index)} />
          </Label>
        ))}
      </Label.Group>
      <Form.Input
        placeholder="Place enter to add tags"
        onKeyUp={e => addTag(e)}
      />
    </div>
  );
};

export default TagInputField;
