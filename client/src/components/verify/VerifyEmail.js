import React from "react";
import { connect } from "react-redux";
import { resendEmailVerification } from "../../actions/userActions";
import { Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import styles from "../../assets/css/auth.module.css";

import logo from "../../assets/img/Logo.png";
import VerifyEmailForm from "./VerifyEmailForm";

class VerifyEmail extends React.Component {
  onSubmit = (formValues) => {
    this.props.resendEmailVerification(formValues, this.props.history);
  };

  render() {
    return (
      <Segment raised className={styles.centre}>
        <Header
          as="h1"
          textAlign="center"
          color="orange"
          image={logo}
          content="Email verification"
        ></Header>
        <div className={styles.back_button}>
          <Header
            size="small"
            color="orange"
            as={Link}
            onClick={this.props.history.goBack}
          >
            <Icon name="arrow left" />
            <Header.Content>Back</Header.Content>
          </Header>
        </div>
        <VerifyEmailForm onSubmit={this.onSubmit}></VerifyEmailForm>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { resendEmailVerification })(
  VerifyEmail
);
