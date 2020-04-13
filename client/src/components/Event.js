import React from "react";
import { connect } from "react-redux";
import { getEvent } from "../actions/eventActions";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Event extends React.Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id, this.props.history);
  }
  render() {
    return <Header>{this.props.event.title}</Header>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

export default connect(mapStateToProps, { getEvent })(withRouter(Event));
