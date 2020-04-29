import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeReview } from "../../actions/userActions";
import { Button, Grid, Header, Icon, Item, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import WriteReviewForm from "../review/WriteReviewForm";

const ReservationCard = ({
  event: { _id: eventID, pictures, title, city, state, country, date },
  reservation: {
    _id: reservationID,
    host,
    status,
    reservationDate,
    reviewToken,
    confirmationDate,
    reviewers,
  },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(
      writeReview(auth.user.id, host._id, reservationID, formValues.review)
    );
  };

  const renderPictures = (pictures) => {
    if (pictures) {
      return pictures.map((picture, index) => (
        <img
          alt={pictures.imageName}
          src={`http:\\\\localhost:8080\\${picture.imageData}`}
          key={index}
        ></img>
      ));
    }
  };

  const renderStatus = () => {
    if (status === "confirmed") {
      return (
        <Header as="h3">
          Status: Confirmed{" "}
          <span>
            <Icon color="green" name="check"></Icon>
          </span>
          <Header.Subheader>ReservationID: {reservationID}</Header.Subheader>
          <Header.Subheader>
            Reserved on:{" "}
            {moment.utc(reservationDate).format("dddd, DD MMMM  YYYY")}
          </Header.Subheader>
          <Header.Subheader>
            Confirmed on:{" "}
            {moment.utc(confirmationDate).format("dddd, DD MMMM  YYYY")}
          </Header.Subheader>
        </Header>
      );
    }
    if (status === "pending") {
      return (
        <Header as="h3">
          Status: Pending{" "}
          <span>
            <Icon name="clock outline"></Icon>
          </span>
          <Header.Subheader>ReservationID: {reservationID}</Header.Subheader>
          <Header.Subheader>
            Reserved on:{" "}
            {moment.utc(reservationDate).format("dddd, DD MMMM  YYYY")}
          </Header.Subheader>
        </Header>
      );
    }
    if (status === "rejected") {
      return (
        <Header as="h3">
          Status: Pending{" "}
          <span>
            <Icon color="red" name="close"></Icon>
          </span>
          <Header.Subheader>ReservationID: {reservationID}</Header.Subheader>
          <Header.Subheader>
            Reserved on:{" "}
            {moment.utc(reservationDate).format("dddd, DD MMMM  YYYY")}
          </Header.Subheader>
        </Header>
      );
    }
  };

  const renderHost = () => {
    if (host) {
      return (
        <Header>
          {`Host: `}
          <Link
            to={`/profile/${host._id}`}
          >{`${host.firstName} ${host.surname}`}</Link>
          <Header.Subheader>
            Email: {host.email ? host.email : "Available once confirmed"}
          </Header.Subheader>
          <Header.Subheader>
            Phone:{" "}
            {host.phoneNumber ? host.phoneNumber : "Available once confirmed"}
          </Header.Subheader>
        </Header>
      );
    }
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
                <Header>{`Host: ${host ? host.firstName : null}`}</Header>
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
    <Grid>
      <Grid.Column width={10}>
        <Item.Group>
          <Item>
            <Item.Image size="small">
              <Carousel
                infiniteLoop={true}
                showThumbs={false}
                dynamicHeight={true}
              >
                {renderPictures(pictures)}
              </Carousel>
            </Item.Image>
            <Item.Content>
              <Link to={`/event/${eventID}`}>
                <Header as="h3">
                  {title}
                  <Header.Subheader>
                    <Icon name="map marker alternate" />
                    {`${city}, ${state}, ${country}`}
                  </Header.Subheader>
                  <Header.Subheader>
                    <Icon name="calendar alternate outline" />
                    {moment.utc(date).format("dddd, DD MMMM YYYY")}
                  </Header.Subheader>
                  <Header.Subheader>
                    <Icon name="clock outline" />
                    {moment.utc(date).format("HH:mm")}
                  </Header.Subheader>
                </Header>
              </Link>
              <Item.Description>{renderHost()}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={5}>
        {renderStatus()}
        {renderCommentButton()}
      </Grid.Column>
    </Grid>
  );
};

export default ReservationCard;
