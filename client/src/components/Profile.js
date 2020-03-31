import React from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment
} from "semantic-ui-react";

import styles from "../assets/css/profile.module.css";

import Interest from "./profile/Interest";
import LanguageTag from "./profile/LanguageTag";
import ReviewList from "./review/ReviewList";
import Statistics from "./profile/Statistics";

class Profile extends React.Component {
  //To be deleted
  // reviews = [
  //   {
  //     name: "joe",
  //     date: "25 March 2020",
  //     content:
  //       "Michael is a lovely host, the food was delicious and the venue delightful, thank you do much!"
  //   },
  //   { name: "Amir", date: "25 March 2020", content: "Great host great food" }
  // ];

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  renderInterestsSegment = interests => {
    return (
      <Segment
        basic
        textAlign="left"
        className={`${styles.margin_zero} ${styles.padding_zero}`}
      >
        <Header as="p">Interests</Header>
        <Interest interests={interests}></Interest>
      </Segment>
    );
  };

  renderLanguagesSegment = languages => {
    return (
      <Segment
        basic
        textAlign="left"
        className={`${styles.margin_zero} ${styles.padding_zero}`}
      >
        <Header as="p">Languages</Header>
        <LanguageTag languages={languages}></LanguageTag>
      </Segment>
    );
  };

  renderSexLabel = sex => {
    if (sex === "M") {
      return (
        <Label as="a" color="blue">
          <Icon name="mars"></Icon>Male
        </Label>
      );
    } else {
      return (
        <Label color="pink">
          <Icon name="venus"></Icon>Female
        </Label>
      );
    }
  };

  render() {
    const {
      events,
      firstName,
      interests,
      languages,
      reviews,
      sex,
      surname
    } = this.props.user;
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Grid column={9} centered>
          {/* LEFT SIDE */}
          <Grid.Column width={3} textAlign="center">
            <Image
              className={styles.image}
              src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
              size="medium"
              circular
            />
            <Label color="orange" size="large">
              Verified User
            </Label>
            <Divider></Divider>
            <Statistics
              eatCount={5}
              reviewCount={reviews ? reviews.length : 0}
              rating={5}
            ></Statistics>
            <Divider></Divider>
            {this.renderLanguagesSegment(languages)}
            <Divider></Divider>
            {this.renderInterestsSegment(interests)}
          </Grid.Column>

          {/* RIGHT SIDE */}
          <Grid.Column width={6}>
            <Header as="h1" className={styles.margin_zero}>
              {`${firstName} ${surname}`}
            </Header>
            {this.renderSexLabel(sex)}
            <Container
              textAlign="justified"
              className={`${styles.description}`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
              amet finibus leo. Duis a augue id nibh condimentum maximus et sit
              amet risus. Praesent a justo ex. Nulla augue sapien, convallis a
              iaculis non, eleifend iaculis justo. Sed tempus sit amet eros
              congue imperdiet. Suspendisse feugiat consequat scelerisque.
            </Container>

            <Header as="h1">Upcoming events</Header>
            <Header as="h1">Reviews</Header>
            <ReviewList reviews={reviews}></ReviewList>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getUser })(Profile);
