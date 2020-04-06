import React from "react";
import { connect } from "react-redux";
import {
  editPhoneNumber,
  getUser,
  sendEmailVerification,
} from "../actions/userActions";
import { resetError } from "../actions/errorActions";
import { withRouter } from "react-router-dom";
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
  submitPhoneNumber = (formValues) => {
    this.props.editPhoneNumber(this.props.match.params.id, formValues);
  };

  componentDidMount() {
    this.props.resetError();
    //Fetch user data
    this.props.getUser(this.props.match.params.id);
  }

  renderEmailVerification = () => {
    const user = this.props.user;

    if (user.verifiedEmail) {
      // Verified email
      return (
        <>
          <Header as="h2">
            <Icon name="check" color="green"></Icon>
            Email
          </Header>
          <Divider></Divider>
          <Header as="h4">You have verified your email. Thank you!</Header>
          <Header as="h3">
            Your email is: <u>{user.email}</u>
          </Header>
        </>
      );
    } else {
      // Has not verify the email
      return (
        <>
          <Header as="h2">
            <Icon name="close" color="red"></Icon>
            Email
          </Header>
          <Divider></Divider>
          <Header as="h4">
            Your email is very crucial for communication, therefore we need to
            verify your email.
          </Header>
          <Header as="h3">
            Your email is: <u>{user.email}</u>
          </Header>
          <Header as="h4">
            Please click the "Verify" button to send the verification link to
            your email.
          </Header>
          <Button textAlign="center" color="orange" onClick={() => this.props.sendEmailVerification(this.props.match.params.id)}>
            Verify
          </Button>
        </>
      );
    }
  };

  renderPhoneVerification = () => {
    const user = this.props.user;
    if (user.verifiedPhone) {
      // Verified phone
      return (
        <>
          <Header as="h2">
            <Icon name="check" color="green"></Icon>
            Phone
          </Header>
          <Divider></Divider>
          <Header as="h4">You have provided a phone number. Thank you!</Header>
        </>
      );
    } else {
      // Phone not verified
      return (
        <>
          <Header as="h2">
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
          <PhoneNumberForm onSubmit={this.submitPhoneNumber}></PhoneNumberForm>
        </>
      );
    }
  };

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          Verify your account
        </Header>

        <Segment>{this.renderEmailVerification()}</Segment>

        <Segment>{this.renderPhoneVerification()}</Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  editPhoneNumber,
  getUser,
  resetError,
  sendEmailVerification,
})(withRouter(Verify));
