import React, { Component } from "react";
import classnames from "classnames";
import styles from "./thankyou.module.css";

export default class ThankYou extends Component {
  render() {
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>Thank you for ordering with EAX Barista</h1>
          <p>We hope you enjoy the experience, see you next time!</p>
          <a href="/CoffeeShops" className="btn btn-primary my-2">
            Back to home page
          </a>
        </div>
      </main>
    );
  }
}
