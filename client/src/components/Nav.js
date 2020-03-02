import React from "react";
import { Button, Dropdown, Image, Menu } from "semantic-ui-react";
import styles from "../assets/css/nav.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo_2.png";

const Nav = () => {
  return (
    <Menu borderless size="massive" className={styles.navbar}>
      <Menu.Item as={Link} to="/" className={styles.no_padding}>
        <Image src={logo} className={styles.logo}></Image>
      </Menu.Item>

      <Menu.Menu position="right">
        <Dropdown item text="£-GBP">
          <Dropdown.Menu>
            <Dropdown.Item>£-GBP</Dropdown.Item>
            <Dropdown.Item>$-USD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>

      <Menu.Item name="host">Become a host</Menu.Item>

      <Menu.Item as={Link} name="help" to="/help">
        Help
      </Menu.Item>

      <Menu.Item as={Link} to="/login">
        Sign in
      </Menu.Item>

      <Menu.Item as={Link} to="/register">
        <Button color="orange">Sign up</Button>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
