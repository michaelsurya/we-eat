import React from "react";
import { connect } from "react-redux";
import { getEvent } from "../actions/eventActions";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

import styles from "../assets/css/event.module.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import AllergenList from "./event/AllergenList";
import BookingCard from "./event/BookingCard";
import Interest from "./profile/Interest";
import LanguageTag from "./profile/LanguageTag";
import MenuList from "./event/MenuList";
import ReviewList from "./review/ReviewList";

class Event extends React.Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id, this.props.history);
  }

  renderPictures = (pictures) => {
    if (pictures) {
      return pictures.map((picture, index) => (
        <img
          src={`http:\\\\localhost:8080\\${picture.imageData}`}
          key={index}
        ></img>
      ));
    }
  };

  renderProfilePict = (profilePict) => {
    if (profilePict) {
      return (
        <Image
          className={styles.image}
          src={`http:\\\\localhost:8080\\${profilePict.imageData}`}
          size="small"
          circular
        />
      );
    } else {
      return (
        <Image
          className={styles.image}
          src={
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
          size="small"
          circular
        />
      );
    }
  };

  render() {
    const {
      allergen,
      date,
      description,
      guestRequired,
      host,
      location,
      menu,
      pictures,
      price,
      title,
    } = this.props.event;
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Grid centered>
          {/* Carousel */}
          <Grid.Column width={14}>
            <Carousel
              className={`${styles.carousel}`}
              infiniteLoop={true}
              showThumbs={false}
              dynamicHeight={true}
            >
              {this.renderPictures(pictures)}
            </Carousel>
          </Grid.Column>

          <Grid.Row>
            {/* Left Part */}
            <Grid.Column width={10}>
              <div className={`${styles.float_right}`}>
                {this.renderProfilePict(host ? host.profilePict : null)}
                <Header
                  className={`${styles.text_align_center}`}
                  textAlign="center"
                  to={host ? `/profile/${host._id}` : null}
                >
                  {host ? host.firstName : null}
                </Header>
              </div>
              <div>
                <Header as="h1">
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
                    {`${guestRequired} guest(s)`}
                  </Header.Subheader>
                </Header>
                <Header
                  as="h3"
                  className={`${styles.top_margin_zero} ${styles.bot_margin_zero}`}
                >
                  Host Languages:
                </Header>
                <LanguageTag languages={["English", "Mandarin"]}></LanguageTag>
                <Header
                  as="h3"
                  className={`${styles.top_margin_zero} ${styles.bot_margin_zero}`}
                >
                  Host Interests:
                </Header>
                <Interest interests={["English", "Mandarin"]}></Interest>
              </div>

              <Divider horizontal>
                <Header as="h4">More about the event</Header>
              </Divider>
              <AllergenList allergens={allergen}></AllergenList>
              <Header as="h3">Event description</Header>
              <p>{description}</p>
              <MenuList menus={menu}></MenuList>

              <Divider horizontal>
                <Header as="h4">What people say</Header>
              </Divider>
              <ReviewList reviews={host ? host.reviews : null}></ReviewList>
              <p>{description}</p>
            </Grid.Column>

            {/* Right Part */}
            <Grid.Column width={4}>
              <BookingCard price={price}></BookingCard>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
  user: state.user,
});

export default connect(mapStateToProps, { getEvent })(withRouter(Event));
