import React from "react";
import { Grid, Header, Icon, Item } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ReservationCard = ({
  event: {
    _id: eventID,
    pictures,
    title,
    location,
    date,
  },
  reservation: {
    _id: reservationID,
    host,
    status,
    reservationDate,
    confirmationDate,
  },
}) => {
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
          <Header.Subheader>
            ReservationID: {reservationID}
          </Header.Subheader>
          <Header.Subheader>
            Reserved on: {moment(reservationDate).format("dddd, DD MMMM  YYYY")}
          </Header.Subheader>
          <Header.Subheader>
            Confirmed on:{" "}
            {moment(confirmationDate).format("dddd, DD MMMM  YYYY")}
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
          <Header.Subheader>
            ReservationID: {reservationID}
          </Header.Subheader>
          <Header.Subheader>
            Reserved on: {moment(reservationDate).format("dddd, DD MMMM  YYYY")}
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
          <Header.Subheader>
            ReservationID: {reservationID}
          </Header.Subheader>
          <Header.Subheader>
            Reserved on: {moment(reservationDate).format("dddd, DD MMMM  YYYY")}
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
          <Header.Subheader>Email: {host.email ? host.email : "Available once confirmed"}</Header.Subheader>
          <Header.Subheader>Phone: {host.phoneNumber ? host.phoneNumber : "Available once confirmed"}</Header.Subheader>
        </Header>
      );
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
                    {location}
                  </Header.Subheader>
                  <Header.Subheader>
                    <Icon name="calendar alternate outline" />
                    {moment(date).format("dddd, DD MMMM YYYY")}
                  </Header.Subheader>
                  <Header.Subheader>
                    <Icon name="clock outline" />
                    {moment(date).format("hh:mm")}
                  </Header.Subheader>
                </Header>
              </Link>
              <Item.Description>{renderHost()}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={5}>{renderStatus()}</Grid.Column>
    </Grid>
  );
};

export default ReservationCard;
