import React from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Header, Image, Menu } from "semantic-ui-react";
import styles from "../assets/css/nav.module.css";
import { Link, withRouter } from "react-router-dom";

import { logoutUser } from "../actions/authActions";

import logo from "../assets/img/Logo_2.png";

const Nav = props => {
  const renderSignInSignOut = (isSignedIn, user) => {
    if (isSignedIn) {
      return (
        <>
          <Dropdown text={user.firstName} className="link item">
            <Dropdown.Menu >
              <Dropdown.Item as={Link} to={`/profile/${user.id}`}>
                <Header as="h4">My Profile</Header>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/profile/edit/${user.id}`}>
                <Header as="h4">Edit Profile</Header>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/user/events`}>
                <Header as="h4">My Events</Header>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/user/reservations`}>
                <Header as="h4">Reservations</Header>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>props.logOutUser(props.history)}>
                <Header as="h4" color="red">
                  Sign Out
                </Header>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <>
          <Menu.Item as={Link} to="/login">
            Sign in
          </Menu.Item>

          <Menu.Item as={Link} to="/register">
            <Button color="orange">Sign up</Button>
          </Menu.Item>
        </>
      );
    }
  };

  return (
    <Menu borderless size="massive" className={styles.navbar}>
      <Menu.Item as={Link} to="/" className={styles.no_padding}>
        <Image src={logo} className={styles.logo}></Image>
      </Menu.Item>

      <Menu.Menu position="right">
        <Dropdown item text="£-GBP">
          <Dropdown.Menu>
            <Dropdown.Item>£-GBP</Dropdown.Item>
            {/* <Dropdown.Item>$-USD</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>

      <Menu.Item as={Link} name="host" to="/event/new">Become a host</Menu.Item>

      <Menu.Item as={Link} name="help" to="/help">
        Help
      </Menu.Item>

      {renderSignInSignOut(props.auth.isSignedIn, props.auth.user)}
    </Menu>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { logOutUser: logoutUser })(withRouter(Nav));
