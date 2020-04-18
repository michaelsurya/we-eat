import React from "react";
import { Header, List } from "semantic-ui-react";

const AllergenList = ({ allergens }) => {
  const list = () => {
    if (allergens) {
      return allergens.map((allergen, index) => <List.Item key={index}>{allergen}</List.Item>);
    } else {
      return null;
    }
  };

  return (
    <>
      <Header as="h3">Allergen List</Header>
      <List bulleted>{list()}</List>
    </>
  );
};

export default AllergenList;
