import React from "react";
import {
  Header,
  Label,
  Segment
} from "semantic-ui-react";
import styles from "../../assets/css/profile.module.css";

const Language = ({ languages }) => {
  const colors = [
    "orange",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown",
  ];

  return (
    <Segment
      basic
      textAlign="left"
      className={`${styles.margin_zero} ${styles.padding_zero}`}
    >
      <Header as="p">Languages</Header>
      <Label.Group>
        {languages.map((language, index) => (
          <Label color={colors[index]}>{language}</Label>
        ))}
      </Label.Group>
    </Segment>
  );
};

export default Language;
