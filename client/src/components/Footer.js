import React from "react";
import styles from "../assets/css/footer.module.css";
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Divider></Divider>
      <div className={styles.top_footer}>
        <Container>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={7}>
                <Header as="h3">Stay in touch</Header>
              </Grid.Column>

              <Grid.Column width={3}>
                <Header as="h3">Services</Header>
                <List link>
                  <List.Item as={Link} to="/">
                    Explore
                  </List.Item>
                  <List.Item as={Link} to="/event/new">
                    Become a host
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={3}>
                <Header as="h3">About</Header>
                <List link>
                  <List.Item as={Link} to="/">
                    About Us
                  </List.Item>
                  <List.Item as={Link} to="/">
                    Contact Us
                  </List.Item>
                  <List.Item as={Link} to="/">
                    Sitemap
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={3}>
                <Header as="h3">Support</Header>
                <List link>
                  <List.Item as={Link} to="/">
                    How it works
                  </List.Item>
                  <List.Item as={Link} to="/">
                    FAQ
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <Segment inverted className={styles.bottom_footer}>
        We Eat 2020
      </Segment>
    </div>
  );
};

export default Footer;
