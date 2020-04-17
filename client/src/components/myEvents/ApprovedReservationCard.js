import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const ApprovedReservationCard = ({
    user: { _id, firstName, surname, approvedDate, profilePict },
  }) => {
return(
    <Card>
      <Card.Content>
        <Image
          floated="left"
          size="tiny"
          src={`http:\\\\localhost:8080\\${profilePict.imageData}`}
        />
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${surname}`}</Card.Header>
        <Card.Meta>{`Approved on ${moment(approvedDate).format(
          "DD MMM YYYY"
        )}`}</Card.Meta>
        <Card.Description>{`${firstName} ${surname} requested to join your event`}</Card.Description>
      </Card.Content>
    </Card>
)
}

export default ApprovedReservationCard;