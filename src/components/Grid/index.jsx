import React, { Component } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";
import EstimatedTimeForm from "./EstimatedTimeForm";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: [{ description: "", header: "", id: 0 }],
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
      .then(result => this.setState({ gridTextAssets: result }))
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
      gridTextAssets,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>Starbucks</h1>
          <p>
            To inspire and nurture the human spirit – one person, one cup and
            one neighborhood at a time.
          </p>
          {/* <a
            href="https://www.starbucks.com/"
            className="btn btn-primary my-2"
          >
            Link to starbucks.com
          </a> */}
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>What would you like to drink today?</h1>
          </div>
          <div className="row justify-content-center py-5">
            <EstimatedTimeForm onAddListItem={this.handleAddListItem} />
          </div>

          <div className="row justify-content-around text-center pb-5">
            {gridTextAssets.map(textAssets => (
              <GridComponent
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
