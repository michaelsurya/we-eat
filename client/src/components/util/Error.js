import React from "react";
import { Message } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

const Error = props => {
  if (!isEmpty(props.error)) {
    return (
      <Message error header="Error" content={props.error.error}></Message>
    );
  }else{
    return null;
  }
};

export default Error;
