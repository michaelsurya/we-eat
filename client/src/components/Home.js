import React from "react";
import styles from "../assets/css/home.module.css";
import { Container, Header } from "semantic-ui-react";
import SearchCard from "./home/SearchCard";
import EventGrid from "./home/EventGrid";


const Home = () => {
  return (
    <div>
      <div className={styles.with_background}>
        <SearchCard></SearchCard>
      </div>
      <Container className={styles.explore_container}>
        <Header as="h1" textAlign="center">
          Explore
        </Header>
        <EventGrid></EventGrid>
        <Header as="h2" color="orange" className={styles.show_more}>Show more...</Header>
      </Container>
    </div>
  );
};

export default Home;
