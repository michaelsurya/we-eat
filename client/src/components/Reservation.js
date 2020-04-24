import React from "react";
import { connect } from "react-redux";
import { getMyReservations } from "../actions/reservationActions";
import { Container, Header, Segment } from "semantic-ui-react";

import styles from "../assets/css/reservation.module.css";

import ReservationCard from "./reservation/ReservationCard";

class Reservation extends React.Component {
  componentDidMount() {
    this.props.getMyReservations(this.props.auth.user.id);
  }

  renderReservations() {
    if (
      Array.isArray(this.props.reservations) &&
      this.props.reservations.length > 0
    ) {
      return this.props.reservations.map((reservation, index) => {
        return (
          <Segment>
            <ReservationCard
              event={reservation.event}
              reservation={reservation}
              key={index}
            ></ReservationCard>
          </Segment>
        );
      });
    } else {
      return <Segment>You have no reservation.</Segment>;
    }
  }

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          My Reservations
        </Header>
        {this.renderReservations()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  reservations: state.reservation,
});

export default connect(mapStateToProps, { getMyReservations })(Reservation);
