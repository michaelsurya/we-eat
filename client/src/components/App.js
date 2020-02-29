import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
};

const DefaultContainer = () => (
  <div>
    <Nav></Nav>
    <Route path="/" exact component={Home} />
    <Footer></Footer>
  </div>
);

export default App;
