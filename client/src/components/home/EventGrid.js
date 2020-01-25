import React from "react";
import { Grid } from "semantic-ui-react";
import EventCard from "./EventCard";

const EventGrid = () => {
  return (
    <Grid>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
          <Grid.Column>
            <EventCard></EventCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid>
  );
};

export default EventGrid;
