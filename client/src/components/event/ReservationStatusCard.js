import React from "react";
import { Button, Card } from "semantic-ui-react";

const ReservationStatusCard = ({ confirmedCount, pendingCount }) => {
  return (
    <Card>
      <Card.Content textAlign="center" header="Reservation Status" />
      <Card.Content>
        <p>You are the host of this event</p>
        <p>
          Currently there are <b>{confirmedCount}</b> confirmed and{" "}
          <b>{pendingCount}</b> pending reservation(s) for this event.
        </p>
        <p>Editing and cancelling your event is not yet implemented</p>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        <Button color="orange">Edit</Button>
        <Button color="red">Cancel</Button>
      </Card.Content>
    </Card>
  );
};

export default ReservationStatusCard;
