import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, Container } from "react-bootstrap";
import classnames from "classnames";
import DrinksComponent from "./DrinksComponent";
import PlaceOrderForm from "./PlaceOrderForm";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./drinks.module.css";
import CONSTANTS from "../../constants";

class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShopsTextAssets: [{ coffeeshop_name: "" }],
      drinksTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: "",
      coffeeshop_id: this.props.match.params.coffeeshop_id,
      modalShow: false
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.fetchCoffeeShopNameWithId = this.fetchCoffeeShopNameWithId.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
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
      .then(result => this.setState({ drinksTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
    this.fetchCoffeeShopNameWithId();
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  fetchCoffeeShopNameWithId() {
    fetch(CONSTANTS.ENDPOINT.COFFEESHOPS + `/${this.state.coffeeshop_id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ coffeeShopsTextAssets: result });
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
  }

  handleOrderSubmit(state) {
    // Warning Pop Up if the user submits an empty message
    if (!state.name) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText:
          CONSTANTS.ERROR_MESSAGE.ORDER_SUBMIT_NAME_EMPTY_MESSAGE
      });
      return;
    } else if (!state.orders) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText:
          CONSTANTS.ERROR_MESSAGE.ORDER_SUBMIT_ORDERS_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.ORDER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: state.name,
        coffeeshop_id: this.state.coffeeshop_id,
        pickup_time: Date.parse(state.startDate),
        drinks: state.orders
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ modalShow: false });
        this.props.history.push("/thankyou");
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.COFFEESHOPS_ADD} ${error}`
        })
      );
  }

  render() {
    const {
      drinksTextAssets,
      WarningMessageOpen,
      WarningMessageText,
      modalShow
    } = this.state;
    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>{this.state.coffeeShopsTextAssets[0].coffeeshop_name}</h1>
          <p>
            To inspire and nurture the human spirit – one person, one cup and
            one neighborhood at a time.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>What would you like to drink today?</h1>
          </div>
          <div className="row justify-content-around text-center pb-5">
            {drinksTextAssets.map(textAssets => (
              <DrinksComponent
                key={textAssets.id}
                header={textAssets.title}
                description={textAssets.shortDescription}
                image={GreyBox}
              />
            ))}
          </div>

          <div className={classnames("text-center", styles.ordering)}>
            <Button
              variant="primary"
              onClick={() => this.setState({ modalShow: true })}
            >
              Start Ordering
            </Button>
          </div>

          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => this.setState({ modalShow: false })}
          >
            <Modal.Body>
              <Container>
                <PlaceOrderForm onOrderSubmit={this.handleOrderSubmit} />
              </Container>
            </Modal.Body>
          </Modal>
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

export default withRouter(Drinks);
