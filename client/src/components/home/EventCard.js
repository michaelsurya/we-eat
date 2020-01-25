import React from "react";
import styles from "../../assets/css/home.module.css";
import { Card, Icon, Image } from "semantic-ui-react";

const EventCard = (title, location, rating, desc, price, host) => {
  return (
    <Card className={styles.event_card}>
      <Image
        src="https://react.semantic-ui.com/images/wireframe/image.png"
        wrapped
        ui={false}
        size="small"
      />
      <Card.Content>
        <p><Icon name="map marker alternate"></Icon>Newcastle upon Tyne</p>
        <Card.Header>Roast Chicken Dinner</Card.Header>
        <p><Icon name="star" color="orange"></Icon>4.5/5 (139)</p>
        <p>
          A classic roast chicken based on my mum recipe. Rest assured, you
          would definitely love it!
        </p>
        <Card.Header>£ 12.95</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>Host</Card.Meta>
        <Card.Header>Michael Surya</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default EventCard;
