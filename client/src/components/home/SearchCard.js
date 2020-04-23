import React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import qs from "query-string";
import { withRouter } from "react-router-dom";

import styles from "../../assets/css/home.module.css";

import SearchForm from "../search/SearchForm";

const SearchCard = (props) => {
  const onSubmit = (formValues) => {
    let query = qs.stringify(formValues, {
      arrayFormat: "index",
      skipNull: true,
    });
    props.history.push({ pathname: "/search", search: query });
  };

  return (
    //USE REDUX FORM LATER
    <div className={styles.vertical_helper}>
      <Segment raised className={styles.search_card}>
        <Header as="h1">Let's find something good</Header>
        <SearchForm onSubmit={onSubmit}></SearchForm>
      </Segment>
    </div>
  );
};

export default withRouter(SearchCard);
