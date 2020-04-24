import React from "react";
import styles from "../../assets/css/home.module.css";
import { Card, Header, Icon, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import LanguageTag from "../profile/LanguageTag";
import CuisineTag from "../event/CuisineTag";

const EventCard = ({ event }) => {
  const {
    _id,  
    city,
    country,
    cuisine,
    date,
    description,
    guestRequired,
    host,
    pictures,
    price,
    title,
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
            <CuisineTag cuisines={cuisine}></CuisineTag>
            <Header.Subheader>
              <Icon name="map marker alternate" />
              {`${city}, ${country}`}
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
        <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {description}
        </p>
        <Header className={styles.top_margin_zero}>{`£ ${parseFloat(
          price
        ).toFixed(2)}`}</Header>
      </Card.Content>
      <Card.Content>
        <Grid verticalAlign="bottom">
          <Grid.Column width={4}>
            <Card.Meta>Host</Card.Meta>
            <Card.Header>
              <Link to={host ? `/profile/${host._id}` : ""}>
                {host ? host.firstName : "Host"}
              </Link>
            </Card.Header>
          </Grid.Column>
          <Grid.Column width={12} textAlign="right">
            <LanguageTag languages={host ? host.languages : []}></LanguageTag>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
