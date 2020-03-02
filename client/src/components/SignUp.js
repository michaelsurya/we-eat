import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { resetError } from "../actions/errorActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";


import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import SignUpForm from "./auth/SignUpForm";
import Error from "./util/Error";

class SignUp extends React.Component {
  onSubmit = formValues => {
    this.props.registerUser(formValues, this.props.history);
  };

  componentDidMount() {
    this.props.resetError();
    // If user is already logged in, redirec to the homepage
    if (this.props.auth.isSignedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Segment raised className={styles.centre}> 
        <Header
          as="h1"
          textAlign="center"
          color="orange"
          image={logo}
          content="Sign Up"
        ></Header>
        <Header size="small" as={Link} to="/" color="orange">
          <Icon name="arrow left" />
          <Header.Content>Back to Home</Header.Content>
        </Header>
        <Error error={this.props.error}></Error>
        <SignUpForm onSubmit={this.onSubmit}></SignUpForm>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { registerUser, resetError })(withRouter(SignUp));
