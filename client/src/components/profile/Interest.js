import React from "react";
import { Label } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

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

  if (interests) {
    if (isEmpty(interests)) {
      return <div>No interests</div>;
    } else {
      return (
        <Label.Group>
          {interests.map((interest, index) => (
            <Label color={colors[index]} key={index}>{interest}</Label>
          ))}
        </Label.Group>
      );
    }
  }
  return null;
};

export default Interest;
