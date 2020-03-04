import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import styles from "../assets/css/profile.module.css";

import Interest from "./profile/Interest";
import Language from "./profile/Language";
import ReviewList from "./review/ReviewList";
import Statistics from "./profile/Statistics";

class Profile extends React.Component {
  //To be deleted
  reviews = [
    {name: "joe", date:"25 March 2020", content:"Michael is a lovely host, the food was delicious and the venue delightful, thank you do much!"},
    {name: "Amir", date:"25 March 2020", content:"Great host great food"}
  ]
  
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
    return (
      <Container className={styles.top_margin}>
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
            <Statistics eatCount={5} reviewCount={10} rating={5}></Statistics>
            <Divider></Divider>
            <Language
              languages={["Indonesian", "English", "Chinese"]}
            ></Language>
            <Divider></Divider>
            <Interest interests={["Game", "Motorcycle", "Football"]}></Interest>
          </Grid.Column>

          {/* RIGHT SIDE */}
          <Grid.Column width={6}>
            <Header as="h1" className={styles.margin_zero}>
              Michael Surya Putra
            </Header>
            {this.renderSexLabel("M")}
            <Container textAlign="justified" className={`${styles.description}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
              amet finibus leo. Duis a augue id nibh condimentum maximus et sit
              amet risus. Praesent a justo ex. Nulla augue sapien, convallis a
              iaculis non, eleifend iaculis justo. Sed tempus sit amet eros
              congue imperdiet. Suspendisse feugiat consequat scelerisque.
            </Container>


            <Header as="h1">Upcoming events</Header>
            <Header as="h1">Reviews</Header>
            <ReviewList reviews={this.reviews}></ReviewList>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Profile;
