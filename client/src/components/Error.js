import React from "react";
import { connect } from "react-redux";
import { Header, Container } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

import styles from "../assets/css/error.module.css";

const Error = (props) => {
  return (
    <Container className={`${styles.top_margin} ${styles.container}`}>
      <Header as="h1" textAlign="center">
        Error
      </Header>
      <Header textAlign="center">
        {!isEmpty(props.error) ? props.error.error : "404: Page not found"}
      </Header>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(Error);
