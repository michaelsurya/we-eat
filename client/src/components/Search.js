import React from "react";
import { connect } from "react-redux";
import { Container, Divider } from "semantic-ui-react";
import qs from "query-string";

import styles from "../assets/css/search.module.css";

import AdvancedSearchForm from "./search/AdvancedSearchForm";

class Search extends React.Component {
  state = { search: {} };

  componentDidMount() {
    this.setState({ search: this.parseURL() });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState({
        search: this.parseURL(),
      });
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
    console.log(this.state);
    return (
      <Container className={`${styles.container}`}>
        <AdvancedSearchForm
          onSubmit={this.onSubmit}
          initialValues={this.state.search}
          enableReinitialize="true"
        ></AdvancedSearchForm>
        <Divider></Divider>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Search);
