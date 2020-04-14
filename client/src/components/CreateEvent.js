import React from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import { createEvent } from "../actions/eventActions";
import { withRouter } from "react-router-dom";
import { Container, Grid, Header } from "semantic-ui-react";

import styles from "../assets/css/event.module.css";

import CreateEventForm from "./event/CreateEventForm";

class CreateEvent extends React.Component {
  componentDidMount() {
    getUser(this.props.auth.user.id);
    if (!this.props.user.isVerified) {
      this.props.history.push(`/verify/${this.props.auth.user.id}`);
    }
  }

  onSubmit = (formValues) => {
    this.props.createEvent(
      this.props.auth.user.id,
      formValues,
      this.props.history
    );
  };

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          Create an event
        </Header>
        <Grid centered>
          <Grid.Column width={9}>
            <CreateEventForm onSubmit={this.onSubmit}></CreateEventForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { createEvent, getUser })(
  withRouter(CreateEvent)
);
