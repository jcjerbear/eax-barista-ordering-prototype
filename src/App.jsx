import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Blank from "./components/Blank";
import Grid from "./components/Grid";
import CoffeeShops from "./components/CoffeeShops";
import List from "./components/List";
import Master_Detail from "./components/Master_Detail";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Redirect exact path="/" to="/coffeeshops" />
          <Route path="/thankyou" component={Blank} />
          <Route path="/coffeeshops/:coffeeshop/drinks" component={Grid} />
          <Route path="/coffeeshops" component={CoffeeShops} />
          <Route path="/list" component={List} />
          <Route path="/masterdetail" component={Master_Detail} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
