import React from "react";
import { Grid } from "semantic-ui-react";
import styles from "../assets/css/home.module.css";

import SearchCard from "./home/SearchCard";

const Home = () => {
  return (
    <div>
      <Grid columns={5} className={styles.with_background}>
        <Grid.Column></Grid.Column>

        <Grid.Column>
          <SearchCard></SearchCard>
        </Grid.Column>
      </Grid>
      <div style={{ height: "1000px" }}></div>
    </div>
  );
};

export default Home;
