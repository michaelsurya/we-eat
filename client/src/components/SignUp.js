import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import SignUpForm from "./auth/SignUpForm";
import Error from "./util/Error";

class SignUp extends React.Component {
  onSubmit = (formValues) => {
    this.props.registerUser(formValues, this.props.history);
  };

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
        <div className={styles.back_button}>
          <Header size="small" as={Link} to="/" color="orange">
            <Icon name="arrow left" />
            <Header.Content>Back to Home</Header.Content>
          </Header>
        </div>
        <Error error={this.props.error}></Error>
        <SignUpForm onSubmit={this.onSubmit}></SignUpForm>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
