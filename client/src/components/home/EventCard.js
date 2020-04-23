import React from "react";
import styles from "../../assets/css/home.module.css";
import { Card, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    city,
    country,
    date,
    description,
    price,
    host,
    guestRequired,
    pictures,
  } = event;
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
  return (
    <Card raised>
      <Carousel infiniteLoop={true} showThumbs={false} dynamicHeight={true}>
        {renderPictures(pictures)}
      </Carousel>
      <Card.Content>
        <Link to={`/event/${_id}`}>
          <Header as="h3">
            {title}
            <Header.Subheader>
              <Icon name="map marker alternate" />
              {`${city}, ${country}`}
            </Header.Subheader>
            <Header.Subheader>
              <Icon name="calendar alternate outline" />
              {moment(date).format("dddd, DD MMMM  YYYY")}
            </Header.Subheader>
            <Header.Subheader>
              <Icon name="clock outline" />
              {moment(date).format("hh:mm")}
            </Header.Subheader>
            <Header.Subheader>
              <Icon name="male" />
              {guestRequired}
            </Header.Subheader>
          </Header>
        </Link>
        <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>{description}</p>
        <Header className={styles.top_margin_zero}>{`£ ${parseFloat(
          price
        ).toFixed(2)}`}</Header>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>Host</Card.Meta>
        <Card.Header>{host ? host.firstName : "Host"}</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
