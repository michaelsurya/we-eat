import React, { useState } from "react";
import { Button, Form, Header, Item } from "semantic-ui-react";

import styles from "../../assets/css/form.module.css";

const PhotosUpload = ({ input, meta, label }) => {
  delete input.value;

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    input.onChange(e.target.files);

    let picturesURL = [];
    for (let [key, value] of Object.entries(e.target.files)) {
      picturesURL.push(URL.createObjectURL(value));
    }

    setFile(picturesURL);
  };

  const renderError = () => {
    if (meta.error) {
      return <p className={styles.error}>{meta.error}</p>;
    }
  };

  const renderImage = () => {
    if (file) {
      return file.map((src) => <Item.Image key={src} src={src} size="small" />);
    } else {
      return (
        <Item.Image
          src={"https://react.semantic-ui.com/images/wireframe/image.png"}
          size="small"
        />
      );
    }
  };

  return (
    <Form.Field>
      <label>{label}</label>
      <p>Use ctrl or shift to select multiple files</p>
      {renderError()}
      <Item>
        {renderImage()}
        <Item.Content>
          <Button
            color="orange"
            onClick={() => document.getElementById("imageInput").click()}
            className={styles.upload_picture_button}
          >
            Upload picture
          </Button>
        </Item.Content>

        <input
          {...input}
          id="imageInput"
          hidden
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={(e) => handleChange(e)}
        />
      </Item>
    </Form.Field>
  );
};

export default PhotosUpload;
