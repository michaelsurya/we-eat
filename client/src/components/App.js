import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import ScrollToTop from "./util/ScrollToTop";

import CreateEvent from "./CreateEvent";
import EditProfile from "./profile/EditProfile";
import Error from "./Error";
import Event from "./Event";
import Home from "./Home";
import MyEvents from "./MyEvents";
import Profile from "./Profile";
import Reservation from "./Reservation";
import Search from "./Search";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Verify from "./Verify";

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
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
      <PrivateRoute path="/event/new/" exact component={CreateEvent}></PrivateRoute>
      <Route path="/event/:id" exact component={Event}></Route>
      <Route path="/profile/:id" exact component={Profile} />
      <PrivateRoute
        path="/profile/edit/:id"
        exact
        component={EditProfile}
      ></PrivateRoute>
      <Route path="/search/" component={Search}></Route>
      <PrivateRoute
        path="/user/events/"
        exact
        component={MyEvents}
      ></PrivateRoute>
      <PrivateRoute
        path="/user/reservations/"
        exact
        component={Reservation}
      ></PrivateRoute>
      <PrivateRoute path="/verify/:id" exact component={Verify}></PrivateRoute>
      <Route component={Error}></Route>
    </Switch>
    <Footer></Footer>
  </div>
);

export default App;
