import React from "react";
import { Label } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

const CuisineTag = ({ cuisines }) => {
  const colors = [
    "blue",
    "violet",
    "green",
    "brown",
    "teal",
    "purple",
    "pink",
    "orange",
  ];

  if (cuisines) {
    if (isEmpty(cuisines)) {
      return <div>No specified cuisine</div>;
    } else {
      return (
        <Label.Group>
          {cuisines.map((cuisine, index) => (
            <Label color={colors[index]} key={index}>
              {cuisine}
            </Label>
          ))}
        </Label.Group>
      );
    }
  }
  return null;
};

export default CuisineTag;
