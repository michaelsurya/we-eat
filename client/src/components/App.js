import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

import Home from "./Home";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


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
    <Route path="/" exact component={Home} />
    <Route path="/profile/" component={Profile} />
    <Footer></Footer>
  </div>
);

export default App;
