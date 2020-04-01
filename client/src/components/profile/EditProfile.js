import React from "react";
import { connect } from "react-redux";
import { getUser, editProfile } from "../../actions/userActions";
import { Container, Grid, Header, Image, Label } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import styles from "../../assets/css/profile.module.css";

import EditProfileForm from "./EditProfileForm";

class EditProfile extends React.Component {
  onSubmit = formValues => {
    this.props.editProfile(this.props.match.params.id, formValues, this.props.history)
  }

  componentDidMount() {
    // Error handling
    if (this.props.auth.user.id !== this.props.match.params.id) {
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <Container className={`${styles.top_margin} ${styles.container}`}>
        <Header as="h1" textAlign="center">
          Edit Profile
        </Header>
        <Grid column={12} centered>
          {/* LEFT SIDE */}
          <Grid.Column width={3} textAlign="center">
            <Image
              className={styles.image}
              src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
              size="medium"
              circular
            />
            <Label color="orange" size="large">
              Change profile picture
            </Label>
          </Grid.Column>

          {/* RIGHT SIDE */}
          <Grid.Column width={9}>
            <EditProfileForm onSubmit={this.onSubmit}></EditProfileForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps, { getUser, editProfile })(withRouter(EditProfile));
