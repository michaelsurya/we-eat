import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/semantic-ui.css";

import styles from "../assets/css/verify.module.css";

import PhoneNumberForm from "./verify/PhoneNumberForm";

class Verify extends React.Component {
  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          Verify your account
        </Header>

        <Segment>
          <Header as="h2">
            {/* <Icon name="check" color="green"></Icon>*/}
            <Icon name="close" color="red"></Icon>
            Email
          </Header>
          <Divider></Divider>
          <Header as="h4">
            Your email is very crucial for communication, therefore we need to
            verify your email.
          </Header>
          <Header as="h3">
            Your email is: <u>shura.mike22@yahoo.com</u>
          </Header>
          <Header as="h4">
            Please click the "Verify" button to send the verification link to
            your email.
          </Header>
          <Button textAlign="center" color="orange">
            Verify
          </Button>
        </Segment>

        <Segment>
          <Header as="h2">
            {/* <Icon name="check" color="green"></Icon>*/}
            <Icon name="close" color="red"></Icon>
            Phone
          </Header>
          <Divider></Divider>
          <Header as="h4">
            Your phone number serves as an alternative communication method and
            therefore required.
            <Header.Subheader color="red">
              WeEAT only releases your phone number for costumers after their
              reservations are confirmed
            </Header.Subheader>
          </Header>
          <PhoneNumberForm></PhoneNumberForm>
        </Segment>
      </Container>
    );
  }
}

export default Verify;
