import React from "react";
import { Comment } from "semantic-ui-react";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  const commentList = reviews.map(review => (
    <ReviewCard
      name={review.name}
      date={review.date}
      content={review.content}
    ></ReviewCard>
  ));
  
  return <Comment.Group size="large">{commentList}</Comment.Group>;
};

export default ReviewList;
