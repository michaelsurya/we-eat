import React from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import styles from "../../assets/css/profile.module.css";

const Interest = ({ interests }) => {
  const colors = [
    "violet",
    "teal",
    "brown",
    "green",
    "pink",
    "blue",
    "purple",
    "orange"
  ];

  return (
    <Segment
      basic
      textAlign="left"
      className={`${styles.margin_zero} ${styles.padding_zero}`}
    >
      <Header as="p">Interests</Header>
      <Label.Group>
        {interests.map((interest, index) => (
          <Label color={colors[index]}>{interest}</Label>
        ))}
      </Label.Group>
    </Segment>
  );
};

export default Interest;
