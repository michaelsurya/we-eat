import React from "react";
import { Comment } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  let commentList;

  if (reviews && !isEmpty(reviews)) {
    commentList = reviews.map(review => (
      <ReviewCard
        user={review.user}
        date={review.date}
        content={review.content}
      ></ReviewCard>
    ));
    return <Comment.Group size="large">{commentList}</Comment.Group>;
  }

  return (<p>No reviews</p>)
  
};

export default ReviewList;
