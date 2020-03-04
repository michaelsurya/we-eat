import React from "react";
import { Label } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

const LanguageTag = ({ languages }) => {
  const colors = [
    "orange",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown"
  ];

  if (languages) {
    if (isEmpty(languages)) {
      return <div>No language</div>;
    } else {
      return (
        <Label.Group>
          {languages.map((language, index) => (
            <Label color={colors[index]}>{language}</Label>
          ))}
        </Label.Group>
      );
    }
  }
  return null;
};

export default LanguageTag;
