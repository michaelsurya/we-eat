import React from "react";
import { connect } from "react-redux";
import { searchEvent } from "../actions/eventActions";
import { Container, Divider, Header } from "semantic-ui-react";
import qs from "query-string";

import styles from "../assets/css/search.module.css";

import AdvancedSearchForm from "./search/AdvancedSearchForm";
import EventGrid from "./home/EventGrid";

class Search extends React.Component {
  state = { search: {} };

  componentDidMount() {
    this.setState({ search: this.parseURL() });
    this.props.searchEvent(this.props.location.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.searchEvent(this.props.location.search);
    }
  }

  onSubmit = (formValues) => {
    let query = qs.stringify(formValues, {
      arrayFormat: "index",
      skipNull: true,
    });
    this.props.history.push({ search: query });
  };

  parseURL() {
    return qs.parse(this.props.location.search, {
      arrayFormat: "index",
    });
  }

  render() {
    return (
      <Container className={`${styles.container}`}>
        <AdvancedSearchForm
          onSubmit={this.onSubmit}
          initialValues={this.state.search}
          enableReinitialize="true"
        ></AdvancedSearchForm>
        <Divider></Divider>
        <Header>Result(s)</Header>
        <EventGrid events={this.props.event}></EventGrid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

export default connect(mapStateToProps, { searchEvent })(Search);
