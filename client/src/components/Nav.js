import React from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import styles from "../assets/css/nav.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu borderless size="massive" className={styles.navbar}>
      <Menu.Item>Logo</Menu.Item>

      <Menu.Item>WeEat</Menu.Item>

      <Menu.Menu position="right">
        <Dropdown item text="£-GBP">
          <Dropdown.Menu>
            <Dropdown.Item>£-GBP</Dropdown.Item>
            <Dropdown.Item>$-USD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>

      <Menu.Item name="host">Become a host</Menu.Item>

      <Menu.Item as={Link} name="help" to="/help">Help</Menu.Item>

      <Menu.Item>Login</Menu.Item>

      <Menu.Item>
        <Button color="orange">Sign-up</Button>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
