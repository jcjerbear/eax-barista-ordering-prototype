﻿import React, { Component } from "react";
import classnames from "classnames";
import CoffeeShopsComponent from "./CoffeeShopsComponent";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./coffeeshops.module.css";
import CONSTANTS from "../../constants";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShopsTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  // Get the text sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.GRID)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => this.setState({ coffeeShopsTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  render() {
    const {
      coffeeShopsTextAssets,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>Coffee Shops</h1>
          {/* <p>Which coffee shop would you like to order from today?</p> */}
          {/* <a
            href="https://www.starbucks.com/"
            className="btn btn-primary my-2"
          >
            Link to starbucks.com
          </a> */}
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>Which coffee shop would you like to order from today?</h1>
          </div>

          <div className="row justify-content-around text-center pb-5">
            {coffeeShopsTextAssets.map(textAssets => (
              <CoffeeShopsComponent
                key={textAssets.id}
                header={textAssets.title}
                description={textAssets.shortDescription}
                image={GreyBox}
              />
            ))}
          </div>
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}