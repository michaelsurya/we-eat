import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import SignInForm from "./auth/SignInForm";

class SignIn extends React.Component {
  onSubmit = (formValues) => {
    this.props.loginUser(formValues);
  };

  componentDidUpdate() {
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
          content="Sign In"
        ></Header>
        <div className={styles.back_button}>
          <Header size="small" as={Link} to="/" color="orange">
            <Icon name="arrow left" />
            <Header.Content>Back to Home</Header.Content>
          </Header>
        </div>
        <SignInForm onSubmit={this.onSubmit}></SignInForm>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(SignIn);
