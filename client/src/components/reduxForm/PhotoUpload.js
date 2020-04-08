import React from "react";
import { Form } from "semantic-ui-react";

const PhotoUpload = ({ input, meta: { touched, error, warning } }) => {
  delete input.value;
  return (
    <div>
      <label htmlFor={input.name}>
        Choose File from your Computer
        <input {...input} type="file" />
      </label>
    </div>
  );
};

export default PhotoUpload;
