import React from "react";
import { Button, Card, Header } from "semantic-ui-react";

import styles from "../../assets/css/event.module.css";

const BookingCard = ({ confirmedCount, limit, price, handleClick }) => {
  return (
    <Card>
      <Card.Content textAlign="center" header="Event Reservation" />
      <Card.Content>
        <Header as="h2" textAlign="center">
          £{price} <span className={`${styles.h4}`}>per guest</span>
        </Header>
        <p>
          Currently there are <b>{confirmedCount}</b> confirmed reservation(s)
          for this event.
        </p>
        <p>
          Once you press the <b>Reserve</b> button below, your reservation
          request will be forwarded to the host.
        </p>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        {confirmedCount < limit ? (
          <Button color="orange" onClick={() => handleClick()}>
            Reserve
          </Button>
        ) : (
          <Button color="orange" disabled>
            Event Full
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default BookingCard;
