import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Item } from "semantic-ui-react";

import styles from "../../assets/css/form.module.css";

const PhotosUpload = ({ input, meta, label }) => {
  delete input.value;

  const [file, setFile] = useState([]);
  const [picsURL, setPicsURL] = useState([]);

  useEffect(() => {
    input.onChange(file)
  }, [file])

  const handleChange = (e) => {
    let newURL = [];

    for (let [key, value] of Object.entries(e.target.files)) {
      newURL.push({ key: value.name, url: URL.createObjectURL(value) });
    }
    setFile([...file, ...e.target.files]);
    setPicsURL([...picsURL, ...newURL]);
  };

  const remove = (key) => {
    URL.revokeObjectURL(picsURL.filter(p => p.key === key).url)
    setFile(file.filter((f) => f.name !== key));
    setPicsURL(picsURL.filter((p) => p.key !== key));
  };

  const renderError = () => {
    if (meta.error) {
      return <p className={styles.error}>{meta.error}</p>;
    }
  };

  const renderImage = () => {
    if (picsURL && picsURL.length > 0) {
      return picsURL.map((src) => {
        return (
          <span key={src.key}>
            <Item.Image src={src.url} size="small" />
            <Icon
              link
              name="close"
              color="red"
              style={{ position: "relative" }}
              onClick={() => remove(src.key)}
            />
          </span>
        );
      });
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
