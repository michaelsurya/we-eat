import React from "react";
import {
  Button,
  Form,
  Header,
  Label,
  Segment,
  FormGroup
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import styles from "../../assets/css/home.module.css";

const SearchCard = () => {
  return (
    //USE REDUX FORM LATER
    <div className={styles.vertical_helper}>
      <Segment raised className={styles.search_card}>
        <Header as="h1">Let's find something good</Header>
        <Form size="medium">
          <Form.Field>
            <label>Where</label>
            <input placeholder="Eg: Newcastle" />
          </Form.Field>
          <Form.Group inline>
            <Form.Field>
              <label>Date</label>
              <input placeholder="DD/MM/YYYY" />
            </Form.Field>
            <Form.Field>
              <label>Guests</label>
              <input placeholder="1" />
            </Form.Field>
          </Form.Group>
          <Button type="submit" color="orange">Submit</Button>
        </Form>
      </Segment>
    </div>
  );
};

export default SearchCard;
