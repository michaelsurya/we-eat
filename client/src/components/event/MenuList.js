import React from "react";
import { Header, List } from "semantic-ui-react";

const MenuList = ({ menus }) => {
  const list = () => {
    if (menus) {
      return menus.map((menu) => {
        return (
          <Header as="h3" textAlign="center">
            {menu.name}
            <Header.Subheader>{menu.description}</Header.Subheader>
          </Header>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <>
      <Header as="h3">Menu</Header>
      <List bulleted>{list()}</List>
    </>
  );
};

export default MenuList;
