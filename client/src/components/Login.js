import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import LoginForm from "./auth/LoginForm";

const Login = props => {
  const onSubmit = formValues => {
    props.loginUser(formValues);
  };

  return (
    <Segment raised className={styles.centre}>
      <Header
        as="h1"
        textAlign="center"
        color="orange"
        image={logo}
        content="Log In"
      ></Header>
      <Header size="small" as={Link} to="/" color="orange">
        <Icon name="arrow left" />
        <Header.Content>Back to Home</Header.Content>
      </Header>
      <LoginForm onSubmit={onSubmit}></LoginForm>
    </Segment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginUser })(Login);
