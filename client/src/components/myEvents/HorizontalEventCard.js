import React from "react";
import { Header, Icon, Item, Segment } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HorizontalEventCard = ({
  event: { _id, pictures, title, location, date, guestRequired, description },
}) => {
  const renderPictures = (pictures) => {
    if (pictures) {
      return pictures.map((picture, index) => (
        <img
          src={`http:\\\\localhost:8080\\${picture.imageData}`}
          key={index}
        ></img>
      ));
    }
  };

  return (
    <Segment>
      {console.log(title)}
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
                  {location}
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
            <Item.Description>{description}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default HorizontalEventCard;
