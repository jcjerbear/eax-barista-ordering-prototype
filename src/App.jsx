import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import ThankYou from "./components/ThankYou";
import Drinks from "./components/Drinks";
import CoffeeShops from "./components/CoffeeShops";
import Order from "./components/Order";
import Master_Detail from "./components/Master_Detail";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Redirect exact path="/" to="/coffeeshops" />
          <Route path="/thankyou" component={ThankYou} />
          <Route path="/coffeeshops/:coffeeshop" component={Drinks} />
          <Route path="/coffeeshops" component={CoffeeShops} />
          <Route path="/order" component={Order} />
          <Route path="/masterdetail" component={Master_Detail} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
