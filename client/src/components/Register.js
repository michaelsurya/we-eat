import React from "react";
import { connect } from "react-redux";
import { register } from "../actions";
import { Header, Segment } from "semantic-ui-react";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import RegisterForm from "./auth/RegisterForm";

const Register = props => {
  const onSubmit = (formValues) => {
    props.register(formValues);
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
      <RegisterForm onSubmit={onSubmit}></RegisterForm>
    </Segment>
  );
};

export default connect(null, { register })(Register);
