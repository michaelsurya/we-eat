import React from "react";
import { Button, Card, Header } from "semantic-ui-react";

import styles from "../../assets/css/event.module.css";

const BookingCard = ({ price, handleClick }) => {
  return (
    <Card>
      <Card.Content textAlign="center" header="Event Reservation" />
      <Card.Content>
        <Header as="h2" textAlign="right">
          £{price} <span className={`${styles.h4}`}>per guest</span>
        </Header>
        <p>
          Currently there are <b>0</b> confirmed reservation(s) for this event.
        </p>
        <p>
          Once you press the <b>Reserve</b> button below, your reservation
          request will be forwarded to the host.
        </p>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        <Button color="orange" onClick={() => handleClick()}>Reserve</Button>
      </Card.Content>
    </Card>
  );
};

export default BookingCard;
