import React from "react";
import { Header, Icon, Item, Segment } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import styles from "../../assets/css/reservation.module.css";

const HorizontalEventCard = ({
  event: {
    _id,
    pictures,
    title,
    city,
    state,
    country,
    date,
    guestRequired,
    description,
  },
}) => {
  const renderPictures = (pictures) => {
    if (pictures) {
      return pictures.map((picture, index) => (
        <img
          alt={pictures.imageName}
          src={`${window.location.protocol}//${window.location.host}${process.env.REACT_APP_BASE_URL}/${picture.imageData}`}
          key={index}
        ></img>
      ));
    }
  };

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="medium">
            <Carousel
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight={true}
            >
              {renderPictures(pictures)}
            </Carousel>
          </Item.Image>
          <Item.Content>
            <Link to={`/event/${_id}`}>
              <Header as="h3">
                {title}
                <Header.Subheader>
                  <Icon name="map marker alternate" />
                  {`${city}, ${state}, ${country}`}
                </Header.Subheader>
                <Header.Subheader>
                  <Icon name="calendar alternate outline" />
                  {moment.utc(date).format("dddd, DD MMMM  YYYY")}
                </Header.Subheader>
                <Header.Subheader>
                  <Icon name="clock outline" />
                  {moment.utc(date).format("HH:mm")}
                </Header.Subheader>
                <Header.Subheader>
                  <Icon name="male" />
                  {guestRequired}
                </Header.Subheader>
              </Header>
            </Link>
            <Item.Description className={styles.line_clamp} style={{maxWidth: "40vh"}}>
              {description}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default HorizontalEventCard;
