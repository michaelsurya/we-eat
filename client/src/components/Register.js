import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Header, Icon, Message, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import isEmpty from "lodash/isEmpty";

import styles from "../assets/css/auth.module.css";

import logo from "../assets/img/Logo.png";
import RegisterForm from "./auth/RegisterForm";

const Register = props => {
  const onSubmit = formValues => {
    props.registerUser(formValues, props.history);
  };

  const renderErrorMessage = () => {
    if (!isEmpty(props.error)) {
      return <Message error header="Error" content={props.error}></Message>;
    }
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
      {renderErrorMessage()}
      <RegisterForm onSubmit={onSubmit}></RegisterForm>
    </Segment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
