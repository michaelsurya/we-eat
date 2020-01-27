import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer></Footer>
    </Router>
  ) 
};

export default App;
