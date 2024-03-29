import React from "react";
import { connect } from "react-redux";
import { resetError } from "../../actions/errorActions";
import {
  changeProfilePict,
  getUserPrivate,
  editProfile,
} from "../../actions/userActions";
import { Button, Container, Grid, Header, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import styles from "../../assets/css/profile.module.css";

import EditProfileForm from "./EditProfileForm";

class EditProfile extends React.Component {
  onSubmit = (formValues) => {
    this.props.editProfile(
      this.props.match.params.id,
      formValues,
      this.props.history
    );
  };

  destructureIntialValues = ({
    firstName,
    surname,
    email,
    sex,
    phoneNumber,
    description,
    languages,
    interests,
  }) => ({
    firstName,
    surname,
    email,
    sex,
    phoneNumber,
    description,
    languages,
    interests,
  });

  renderProfilePict = (profilePict) => {
    if (profilePict) {
      return (
        <Image
          className={styles.image}
          src={`${window.location.protocol}//${window.location.host}${process.env.REACT_APP_BASE_URL}/${profilePict.imageData}`}
          size="medium"
          circular
        />
      );
    } else {
      return (
        <Image
          className={styles.image}
          src={
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
          size="medium"
          circular
        />
      );
    }
  };

  componentDidMount() {
    this.props.resetError();
    // Error handling
    if (this.props.auth.user.id !== this.props.match.params.id) {
      this.props.history.push("/");
    } else {
      this.props.getUserPrivate(this.props.match.params.id, this.props.history);
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
            {this.renderProfilePict(this.props.user.profilePict)}
            <Button
              color="orange"
              onClick={() => document.getElementById("imageInput").click()}
            >
              Change profile picture
            </Button>
            <input
              id="imageInput"
              hidden
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) =>
                this.props.changeProfilePict(
                  this.props.match.params.id,
                  e.target.files
                )
              }
            />
          </Grid.Column>

          {/* RIGHT SIDE */}
          <Grid.Column width={9}>
            <EditProfileForm
              onSubmit={this.onSubmit}
              initialValues={this.destructureIntialValues(this.props.user)}
              enableReinitialize="true"
            ></EditProfileForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {
  changeProfilePict,
  editProfile,
  getUserPrivate,
  resetError,
})(withRouter(EditProfile));
