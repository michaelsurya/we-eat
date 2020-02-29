import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import RegisterForm from "./auth/RegisterForm";

const Register = props => {
  const onSubmit = formValues => {
    props.registerUser(formValues);
  };

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
      <RegisterForm onSubmit={onSubmit}></RegisterForm>
    </Segment>
  );
};

export default connect(null, { registerUser })(Register);
