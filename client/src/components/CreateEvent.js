import React from "react";
import { connect } from "react-redux";
import { resetError } from "../actions/errorActions";
import { withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

import styles from "../assets/css/event.module.css";

import CreateEventForm from "./event/CreateEventForm";

class CreateEvent extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues)
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

export default CreateEvent;
