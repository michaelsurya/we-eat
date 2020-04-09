import React, { useState } from "react";
import { Button, Form, Item } from "semantic-ui-react";

import styles from "../../assets/css/form.module.css";

const PhotoUpload = ({ input, meta, label }) => {
  delete input.value;

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    input.onChange(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Form.Field>
      <label>{label}</label>
      <Item>
        <Item.Image
          src={
            file
              ? file
              : "https://react.semantic-ui.com/images/wireframe/image.png"
          }
          size="small"
        />
        <Button
          color="orange"
          onClick={() => document.getElementById("imageInput").click()}
          className={styles.upload_picture_button}
        >
          Upload picture
        </Button>
        <input
          {...input}
          id="imageInput"
          hidden
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleChange(e)}
        />
      </Item>
    </Form.Field>
  );
};

export default PhotoUpload;
