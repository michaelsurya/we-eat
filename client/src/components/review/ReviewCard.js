import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const ReviewCard = ({ user, date, content }) => {
  return (
    <Comment>
      <Comment.Avatar
        src={
          user.profilePict
            ? `http:\\\\localhost:8080\\${user.profilePict.imageData}`
            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        }
      />
      <Comment.Content>
        <Comment.Author as="a">{`${user.firstName} ${user.surname}`}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(date).format("DD MMMM YYYY")}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default ReviewCard;
