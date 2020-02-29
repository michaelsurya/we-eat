import React from "react";
import styles from "../../assets/css/home.module.css";
import { Card, Icon, Image} from "semantic-ui-react";

const EventCard = (title, location, date, time, rating, desc, price, host) => {
  return (
    <Card className={styles.event_card}>
      <Image
        src="https://react.semantic-ui.com/images/wireframe/image.png"
        wrapped
        ui={false}
        size="small"
      />
      <Card.Content>
        <p>
          <Icon name="map marker alternate"></Icon>Newcastle upon Tyne
        </p>
        <Card.Header>Roast Chicken Dinner</Card.Header>
        <p>
          <Icon name="calendar outline"></Icon>22 January 2020
        </p>
        <p>
          <Icon name="clock outline"></Icon>1pm - 2.30pm
        </p>
        <p>
          A classic roast chicken based on my mum recipe. Rest assured, you
          would definitely love it!
        </p>
        <Card.Header textAlign="right">£ 12.95</Card.Header>
        <p className={styles.rating}>
          <Icon name="star" color="orange"></Icon>4.5/5 (139)
        </p>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>Host</Card.Meta>
        <Card.Header>Michael Surya</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
