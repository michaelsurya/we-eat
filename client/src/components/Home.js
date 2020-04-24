import React from "react";
import { connect } from "react-redux";
import { searchEvent } from "../actions/eventActions";
import { Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "../assets/css/home.module.css";

import SearchCard from "./home/SearchCard";
import EventGrid from "./home/EventGrid";

class Home extends React.Component {
  componentDidMount() {
    this.props.searchEvent("?limit=9");
  }
  render() {
    return (
      <div>
        <div className={styles.with_background}>
          <SearchCard></SearchCard>
        </div>
        <Container className={styles.explore_container}>
          <Header as="h1" textAlign="center">
            Explore
          </Header>
          <EventGrid events={this.props.event}></EventGrid>
          <Link to="/search">
            <Header as="h2" color="orange" className={styles.show_more}>
              Show more...
            </Header>
          </Link>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { searchEvent })(Home);
