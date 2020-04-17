import React from "react";
import { connect } from "react-redux";
import { getMyEvents } from "../actions/eventActions";
import { editReservation } from "../actions/reservationActions";
import { Container, Header, Item, Segment, Card } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import filter from "lodash/filter";

import styles from "../assets/css/reservation.module.css";

import ActionCard from "./myEvents/ActionCard";
import ApprovedReservationCard from "./myEvents/ApprovedReservationCard";
import HorizontalEventCard from "./myEvents/HorizontalEventCard";

class MyEvents extends React.Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.auth.user.id);
  }

  renderEvents() {
    if (Array.isArray(this.props.events) && this.props.events.length > 0) {
      return this.props.events.map((event, index) => {
        return (
          <>
            <HorizontalEventCard
              event={event}
              key={index}
            ></HorizontalEventCard>
            <Segment>
              <Header as="h3">Approved reservations</Header>
              {this.renderConfirmed(
                filter(event.reservation, { status: "confirmed" })
              )}
              <Header as="h3">Pending reservations</Header>
              {this.renderActions(
                filter(event.reservation, { status: "pending" })
              )}
            </Segment>
          </>
        );
      });
    } else {
      return <Segment>You have no event.</Segment>;
    }
  }

  renderActions = (reservations) => {
    if (Array.isArray(reservations) && reservations.length > 0) {
      return reservations.map((reservation, index) => (
        <Card.Group centered>
          <ActionCard
            key={index}
            user={reservation.user}
            event={reservation.event}
            handleAction={this.handleAction}
          ></ActionCard>
        </Card.Group>
      ));
    } else {
      return <p>No pending reservation</p>;
    }
  };

  renderConfirmed = (reservations) => {
    if (Array.isArray(reservations) && reservations.length > 0) {
      return reservations.map((reservation, index) => (
        <Card.Group centered>
          <ApprovedReservationCard
            key={index}
            user={reservation.user}
          ></ApprovedReservationCard>
        </Card.Group>
      ));
    } else {
      return <p>No confirmed reservation</p>;
    }
  };

  handleAction = (event, user, status) => {
    this.props.editReservation(event, this.props.auth.user.id, user, status);
  };

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          My events
        </Header>
        <Segment.Group horizontal raised>
          {this.renderEvents()}
        </Segment.Group>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  events: state.event,
});

export default connect(mapStateToProps, { editReservation, getMyEvents })(
  MyEvents
);
