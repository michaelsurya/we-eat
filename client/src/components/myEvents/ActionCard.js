import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const ActionCard = ({
  user: { _id, firstName, surname, reservationDate, profilePict },
  event,
  handleAction,
}) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="left"
          size="tiny"
          src={
            profilePict
              ? `${window.location.protocol}//${window.location.host}${process.env.REACT_APP_BASE_URL}/${profilePict.imageData}`
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
        />
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${surname}`}</Card.Header>
        <Card.Meta>{`On ${moment(reservationDate).format(
          "DD MMM YYYY"
        )}`}</Card.Meta>
        <Card.Description>{`${firstName} ${surname} requested to join your event`}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            onClick={() => handleAction(event, _id, "confirmed")}
          >
            Approve
          </Button>
          <Button
            basic
            color="red"
            onClick={() => handleAction(event, _id, "rejected")}
          >
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ActionCard;
