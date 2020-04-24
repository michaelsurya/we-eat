import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const ApprovedReservationCard = ({
  user: { _id, firstName, surname, approvedDate},
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${surname}`}</Card.Header>
        <Card.Meta>{`Approved on ${moment.utc(approvedDate).format(
          "DD MMM YYYY"
        )}`}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ApprovedReservationCard;
