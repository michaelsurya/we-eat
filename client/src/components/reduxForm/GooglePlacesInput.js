import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import { Form, Icon} from "semantic-ui-react";

const LIBRARIES = ["places"];

const GooglePlacesInput = (props) => {
  const {
    input: { value, onChange },
    label,
  } = props;
  return (
    <Form.Field width={6}>
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
          types={["geocode"]}
        />
        
      </LoadScript>
    </Form.Field>
  );
};

export default GooglePlacesInput;
