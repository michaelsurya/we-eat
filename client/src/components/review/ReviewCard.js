import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const ReviewCard = ({name, date, content}) => {
  return (
    <Comment>
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{name}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(date).format("DD MMMM YYYY")}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default ReviewCard;
