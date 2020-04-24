import React from "react";
import { Card } from "semantic-ui-react";
import EventCard from "./EventCard";

const EventGrid = ({ events }) => {
  const render = () => {
    if (Array.isArray(events)) {
      return events.map((event, index) => {
        return <EventCard key={index} event={event}></EventCard>;
      });
    } else {
      return <p>No events found</p>;
    }
  };

  return <Card.Group itemsPerRow={3}>{render()}</Card.Group>;
};

export default EventGrid;
