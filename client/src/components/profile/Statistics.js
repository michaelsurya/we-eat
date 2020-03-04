import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import styles from "../../assets/css/profile.module.css";

const Statistics = ({ eatCount, reviewCount, rating }) => {
  return (
    <Segment
      basic
      textAlign="left"
      className={`${styles.margin_zero} ${styles.padding_zero}`}
    >
      <Header as="h4">
        <Icon name="food" color="orange"></Icon> {eatCount} times
      </Header>
      <Header as="h4">
        <Icon name="comment alternate outline" color="orange"></Icon>{" "}
        {reviewCount} reviews
      </Header>
      <Header as="h4">
        <Icon name="star" color="orange"></Icon> {rating}/5
      </Header>
    </Segment>
  );
};

export default Statistics;
