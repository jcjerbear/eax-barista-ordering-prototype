import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import OrderItem from "./OrderItem";
// import OrderForm from "./OrderForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderTextAssets: [
        { id: 0, customer: "", coffeeshop_id: 0, pickup_time: 0, drinks: "" }
      ],
      coffeeShopsTextAssets: [{ coffeeshop_name: "" }],
      list: [],
      WarningMessageOpen: false,
      WarningMessageText: "",
      coffeeshop_id: this.props.match.params.coffeeshop_id
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
    this.handleAddListItem = this.handleAddListItem.bind(this);
    this.fetchCoffeeShopNameWithId = this.fetchCoffeeShopNameWithId.bind(this);
    this.fetchAscendinglySortedOrders = this.fetchAscendinglySortedOrders.bind(
      this
    );
  }

  // Get the sample data from the back end
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.LIST)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => this.setState({ list: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`
        })
      );
    this.fetchCoffeeShopNameWithId();
    this.fetchAscendinglySortedOrders();
  }

  handleDeleteListItem(listItem) {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        let list = this.state.list;
        list = list.filter(item => item._id !== result._id);
        this.setState({ list: list });
      })
      .catch(error => {
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  handleAddListItem(textField) {
    // Warning Pop Up if the user submits an empty message
    if (!textField) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textField
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result =>
        this.setState(prevState => ({
          list: [result, ...prevState.list]
        }))
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
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

  fetchAscendinglySortedOrders() {
    console.log("within fetchAscendinglySortedOrders");
    fetch(CONSTANTS.ENDPOINT.ORDER + `/${this.state.coffeeshop_id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        this.setState({ orderTextAssets: result });
        console.log(this.state.orderTextAssets);
      })
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get ascendingly sorted order failed: ${error}`
        })
      );
  }

  render() {
    const { list, WarningMessageOpen, WarningMessageText } = this.state;
    return (
      <main id="mainContent" className="container">
        <div className="row">
          <div className="col mt-5 p-0">
            <h3>
              {this.state.coffeeShopsTextAssets[0].coffeeshop_name}'s Customer
              Order List
            </h3>
          </div>
          {/* <div className="col-12 p-0">
            <OrderForm onAddListItem={this.handleAddListItem} />
          </div> */}
          {this.state.orderTextAssets.map(textAsset => (
            <OrderItem
              key={textAsset._id}
              textAsset={textAsset}
              onDeleteListItem={this.handleDeleteListItem}
            />
          ))}
          <WarningMessage
            open={WarningMessageOpen}
            text={WarningMessageText}
            onWarningClose={this.handleWarningClose}
          />
        </div>
      </main>
    );
  }
}

export default withRouter(Order);
