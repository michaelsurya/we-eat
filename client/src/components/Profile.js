import React from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import styles from "../assets/css/profile.module.css";

import Interest from "./profile/Interest";
import LanguageTag from "./profile/LanguageTag";
import ReviewList from "./review/ReviewList";
import Statistics from "./profile/Statistics";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id, this.props.history);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getUser(this.props.match.params.id, this.props.history);
    }
  }

  renderEditButton = () => {
    const profileId = this.props.match.params.id;

    if (this.props.auth.isSignedIn) {
      if (profileId === this.props.auth.user.id) {
        return (
          <Button
            as={Link}
            to={`/profile/edit/${this.props.auth.user.id}`}
            floated="right"
            color="orange"
          >
            <Icon name="edit outline" />
            Edit
          </Button>
        );
      }
    }
  };

  renderDescription = (description) => {
    if (description === "") {
      this.return(
        <Container textAlign="justified" className={`${styles.description}`}>
          This user has not written any description.
        </Container>
      );
    }

    return (
      <Container textAlign="justified" className={`${styles.description}`}>
        {description}
      </Container>
    );
  };

  renderInterestsSegment = (interests) => {
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

  renderLanguagesSegment = (languages) => {
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

  renderProfilePict = (profilePict) => {
    if (profilePict) {
      return (
        <Image
          className={styles.image}
          src={`${window.location.protocol}//${window.location.host}${process.env.REACT_APP_BASE_URL}/${profilePict.imageData}`}
          size="medium"
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
          size="medium"
          circular
        />
      );
    }
  };

  renderSexLabel = (sex) => {
    if (sex === "M") {
      return (
        <Label color="blue">
          <Icon name="mars"></Icon>Male
        </Label>
      );
    } else if (sex === "F") {
      return (
        <Label color="pink">
          <Icon name="venus"></Icon>Female
        </Label>
      );
    }
  };

  renderVerified = (isVerified) => {
    const profileId = this.props.match.params.id;
    if (this.props.auth.isSignedIn) {
      if ((profileId === this.props.auth.user.id) & !isVerified) {
        return (
          <Button as={Link} to={`/verify/${profileId}`} inverted color="orange">
            Verify Account
          </Button>
        );
      } else if (isVerified) {
        return (
          <Label color="orange" size="large">
            <Icon name="check"></Icon>
            Verified
          </Label>
        );
      }
    }
  };

  render() {
    const {
      firstName,
      interests,
      isVerified,
      languages,
      reviews,
      sex,
      surname,
      description,
      profilePict,
    } = this.props.user;

    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Grid column={9} centered>
          {/* LEFT SIDE */}
          <Grid.Column width={3} textAlign="center">
            {this.renderProfilePict(profilePict)}
            {this.renderVerified(isVerified)}
            <Divider></Divider>
            <Statistics
              eatCount={5}
              reviewCount={reviews ? reviews.length : "N/A"}
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
              {this.renderEditButton()}
            </Header>
            {this.renderSexLabel(sex)}
            {this.renderDescription(description)}
            <Header as="h1">Upcoming events</Header>
            <p>This is not implemented yet</p>
            <Header as="h1">Reviews</Header>
            <ReviewList reviews={reviews}></ReviewList>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUser })(withRouter(Profile));
