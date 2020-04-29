import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeReview } from "../../actions/userActions";
import { Button, Card, Header, Modal } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import WriteReviewForm from "../review/WriteReviewForm";

const ApprovedReservationCard = ({
  user: { _id, firstName, surname, approvedDate },
  reservation: { _id: reservationID, reviewToken, reviewers },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(writeReview(auth.user.id, _id, reservationID, formValues.review));
  };

  const renderCommentButton = () => {
    if (reviewToken) {
      if (reviewers.includes(auth.user.id)) {
        return <Button disabled>You have written a review</Button>;
      }
      const start = moment(reviewToken.validStart);
      const end = moment(reviewToken.validEnd);
      if (moment.utc().isBetween(start, end)) {
        return (
          <>
            <Button
              color="orange"
              inverted
              onClick={() => setIsModalOpen(true)}
            >
              Write a review
            </Button>
            <Modal open={isModalOpen}>
              <Header content="Write a review" />
              <Modal.Content>
                <Header>{`Costumer: ${firstName}`}</Header>
                <WriteReviewForm
                  close={() => setIsModalOpen(false)}
                  onSubmit={onSubmit}
                ></WriteReviewForm>
              </Modal.Content>
            </Modal>
          </>
        );
      }
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header
          as={Link}
          to={`/profile/${_id}`}
        >{`${firstName} ${surname}`}</Card.Header>
        <Card.Meta>{`Approved on ${moment
          .utc(approvedDate)
          .format("DD MMM YYYY")}`}</Card.Meta>
        {renderCommentButton()}
      </Card.Content>
    </Card>
  );
};

export default ApprovedReservationCard;
