import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { Form, Segment } from "semantic-ui-react";

import InlineEditable from "./InlineEditable";

Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);

const LIBRARIES = ["places"];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      state: "",
      postcode: "",
      coords: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    this.getDataFromLatLng(this.state.coords.lat, this.state.coords.lng);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.center.lat !== prevProps.center.lat ||
      this.props.center.lng !== prevProps.center.lng
    ) {
      this.getDataFromLatLng(this.props.center.lat, this.props.center.lng);
    }
    this.props.input.onChange(this.state);
  }

  getDataFromLatLng(lat, lng) {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const addressArray = response.results[0].address_components,
          address = this.getAddress(addressArray),
          city = this.getCity(addressArray),
          state = this.getState(addressArray),
          country = this.getCountry(addressArray),
          postcode = this.getPostcode(addressArray);

        this.setState({
          address: address ? address : "",
          city: city ? city : "",
          state: state ? state : "",
          country: country ? country : "",
          postcode: postcode ? postcode : "",
          coords: { lat: lat, lng: lng },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.coords.lat !== this.props.center.lat ||
      this.props.center.lat !== nextProps.center.lat ||
      this.state.coords.lat !== nextState.coords.lat ||
      this.state.coords.lng !== nextState.coords.lng ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  /**
   * Get the street number and route
   *
   * @param addressArray
   * @return {string}
   */
  getAddress = (addressArray) => {
    let number = "";
    let street = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "street_number" === addressArray[i].types[0]
      ) {
        number = addressArray[i].long_name;
      }
      if (addressArray[i].types[0] && "route" === addressArray[i].types[0]) {
        street = addressArray[i].long_name;
      }
    }
    return `${number ? `${number} ` : ""}${street}`;
  };

  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "postal_town" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_2" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  /**
   * Get the country
   *
   * @param addressArray
   * @return {string}
   */
  getCountry = (addressArray) => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "country" === addressArray[i].types[0]
        ) {
          country = addressArray[i].long_name;
          return country;
        }
      }
    }
  };

  /**
   * Get the postcode
   *
   * @param addressArray
   * @return {string}
   */
  getPostcode = (addressArray) => {
    let postcode = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "postal_code" === addressArray[i].types[0]
        ) {
          postcode = addressArray[i].long_name;
          return postcode;
        }
      }
    }
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceChanged = (place) => {
    const addressArray = place.address_components,
      address = this.getAddress(addressArray),
      city = this.getCity(addressArray),
      state = this.getState(addressArray),
      country = this.getCountry(addressArray),
      postcode = this.getPostcode(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      city: city ? city : "",
      state: state ? state : "",
      country: country ? country : "",
      postcode: postcode ? postcode : "",
      coords: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    this.getDataFromLatLng(event.latLng.lat(), event.latLng.lng());
  };

  inputOnChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Segment>
        <Form.Field>
          <label>Location:</label>
          <LoadScript
            id="script-loader"
            googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
            libraries={LIBRARIES}
          >
            <GoogleMap
              id="example-map"
              mapContainerStyle={{
                height: "300px",
              }}
              zoom={this.props.zoom ? this.props.zoom : 15}
              center={{
                lat: this.state.coords.lat,
                lng: this.state.coords.lng,
              }}
            >
              <Marker
                draggable={true}
                position={this.state.coords}
                onDragEnd={this.onMarkerDragEnd}
              />
            </GoogleMap>
            <label>Search your location here:</label>
            <Autocomplete
              onPlaceSelected={this.onPlaceChanged}
              types={""}
              placeholder="Please enter a location or a postcode Eg: Newcsatle or NE1 6EA"
            />
          </LoadScript>
          <Segment>
            <InlineEditable
              label="Address"
              value={this.state.address}
              onChange={(val) => this.inputOnChange("address", val)}
            ></InlineEditable>
            <Form.Group widths="equal">
              <Form.Field>
                <label>City</label>
                <p>{this.state.city}</p>
              </Form.Field>
              <Form.Field>
                <label>State</label>
                <p>{this.state.state}</p>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Country</label>
                <p>{this.state.country}</p>
              </Form.Field>
              <Form.Field>
                <label>Postcode</label>
                <p>{this.state.postcode}</p>
              </Form.Field>
            </Form.Group>
          </Segment>
        </Form.Field>
      </Segment>
    );
  }
}
export default Map;
