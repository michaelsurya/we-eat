import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

import CreateEvent from "./CreateEvent";
import EditProfile from "./profile/EditProfile";
import Error from "./Error";
import Event from "./Event";
import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify from "./Verify";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
};

const DefaultContainer = () => (
  <div>
    <Nav></Nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/event/new/" exact component={CreateEvent}></Route>
      <Route path="/event/:id" exact component={Event}></Route>
      <Route path="/profile/:id" exact component={Profile} />
      <PrivateRoute
        path="/profile/edit/:id"
        exact
        component={EditProfile}
      ></PrivateRoute>
      <PrivateRoute path="/verify/:id" exact component={Verify}></PrivateRoute>
      <Route component={Error}></Route>
    </Switch>
    <Footer></Footer>
  </div>
);

export default App;
