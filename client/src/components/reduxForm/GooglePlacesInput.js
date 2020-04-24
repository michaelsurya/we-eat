import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import { Form } from "semantic-ui-react";

import styles from "../../assets/css/form.module.css";

const LIBRARIES = ["places"];

const GooglePlacesInput = (props) => {
  const {
    input: { value, onChange },
    label,
    meta,
    width
  } = props;
  return (
    <Form.Field width={width ? width : 6} >
      <label>{label}</label>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDTbkTz6jmv4J-L_vdIF7OjVxqeC7Ghkps"
        libraries={LIBRARIES}
      >
        <Autocomplete
          onPlaceSelected={(place) =>
            onChange([
              place.geometry.location.lat(),
              place.geometry.location.lng(),
            ])
          }
          onChange={(e) => e.target.value === "" ? onChange(null) : null}
          placeholder={value}
          types={["geocode"]}
        />
      </LoadScript>
      {renderError(meta)}
    </Form.Field>
  );
};

function renderError({ error, touched }) {
  if (error && touched) {
    return <p className={styles.error}>{error}</p>;;
  }
}

export default GooglePlacesInput;
