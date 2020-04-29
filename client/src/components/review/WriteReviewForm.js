import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Icon, Container } from "semantic-ui-react";

import TextArea from "../reduxForm/TextArea";

class WriteReviewForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="review" component={TextArea} label="Write your review" />
        <Container textAlign="right">
          <Button color="red" onClick={() => this.props.close()}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Submit
          </Button>
        </Container>
      </Form>
    );
  }
}

const validate = ({ review }) => {
  const errors = {};

  if (!review) {
    errors.review = "Title is required";
  }
  // Check the title length
  else if (review.length < 10 || review.length > 250) {
    errors.review = "Invalid length";
  }
  return errors;
};

export default reduxForm({ form: "writeReviewForm", validate: validate })(
  WriteReviewForm
);
