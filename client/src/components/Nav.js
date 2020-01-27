import React from "react";
import { Button, Dropdown, Header, Image, Menu } from "semantic-ui-react";
import styles from "../assets/css/nav.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";

const Nav = () => {
  return (
    <Menu borderless size="massive" className={styles.navbar}>
      <Menu.Item as={Link} to="/">
        <Image src={logo} className={styles.logo}></Image>
      </Menu.Item>

      <Menu.Item>
        <Header as="h1" color="orange">
          WeEAT
        </Header>
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

      <Menu.Item>Login</Menu.Item>

      <Menu.Item>
        <Button color="orange">Sign-up</Button>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
