import React from "react";
import { connect } from "react-redux";
import { getMyEvents } from "../actions/eventActions";
import { Container, Header, Item, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import styles from "../assets/css/reservation.module.css";

import HorizontalEventCard from "./myEvents/HorizontalEventCard";

class MyEvents extends React.Component {
  componentDidMount() {
    this.props.getMyEvents(this.props.auth.user.id);
  }

  renderEvents() {
    if (this.props.events && Array.isArray(this.props.events)) {
      return this.props.events.map((event, index) => {
        return (
          <>
            <HorizontalEventCard event={event} key={index}></HorizontalEventCard>
          </>
        );
      });
    } else {
      return <Header as="h3">You have no event.</Header>;
    }
  }

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          My events
        </Header>
        <Segment.Group horizontal raised>
          {this.renderEvents()}
          <Segment>
            <Item>
              <Item.Header as="h3">Confirmed reservations: 3</Item.Header>
              <Item.Header as="h3">Pending reservations: 0</Item.Header>
            </Item>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  events: state.event,
});

export default connect(mapStateToProps, { getMyEvents })(MyEvents);
