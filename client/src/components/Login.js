import React from "react";
import { connect } from "react-redux";
import { Header, Segment } from "semantic-ui-react";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import LoginForm from "./auth/LoginForm";

const Login = () => {
  return (
    <Segment raised className={styles.centre}>
      <Header
        as="h1"
        textAlign="center"
        color="orange"
        image={logo}
        content="Log In"
      ></Header>
      <LoginForm></LoginForm>
    </Segment>
  );
};

export default connect(null, {})(Login);
