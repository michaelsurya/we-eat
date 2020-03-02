import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { resetError } from "../actions/errorActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import SignInForm from "./auth/SignInForm";
import Error from "./util/Error";

class SignIn extends React.Component {
  onSubmit = formValues => {
    this.props.loginUser(formValues);
  };

  componentDidMount() {
    this.props.resetError();
    // If user is already logged in, redirec to the homepage
    if (this.props.auth.isSignedIn) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isSignedIn) {
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
          content="Sign In"
        ></Header>
        <Header size="small" as={Link} to="/" color="orange">
          <Icon name="arrow left" />
          <Header.Content>Back to Home</Header.Content>
        </Header>
        <Error error={this.props.error}></Error>
        <SignInForm onSubmit={this.onSubmit}></SignInForm>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginUser, resetError })(SignIn);
