import React, { Component } from "react";
import { Button, Modal, Dropdown, Container, Row, Col } from "react-bootstrap";
import classnames from "classnames";
import CoffeeShopsComponent from "./CoffeeShopsComponent";
import RegisterForm from "./RegisterForm";
import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./coffeeshops.module.css";
import CONSTANTS from "../../constants";

export default class CoffeeShops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShopsTextAssets: [{ id: 0, coffeeshop_name: "" }],
      WarningMessageOpen: false,
      WarningMessageText: "",
      modalShow: false
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.fetchCoffeeShops = this.fetchCoffeeShops.bind(this);
    this.handleCoffeeShopRegistration = this.handleCoffeeShopRegistration.bind(
      this
    );
  }

  // Get the text sample data from the back end
  componentDidMount() {
    this.fetchCoffeeShops();
  }

  fetchCoffeeShops() {
    fetch(CONSTANTS.ENDPOINT.COFFEESHOPS)
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
          WarningMessageText: `Request to get register coffee shops failed: ${error}`
        })
      );
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  handleCoffeeShopRegistration(coffeeshop_name) {
    // Warning Pop Up if the user submits an empty message
    if (!coffeeshop_name) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: CONSTANTS.ERROR_MESSAGE.COFFEESHOPS_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.COFFEESHOPS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coffeeshop_name
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.setState({ modalShow: false });
        this.fetchCoffeeShops();
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
      coffeeShopsTextAssets,
      WarningMessageOpen,
      WarningMessageText,
      modalShow
    } = this.state;

    return (
      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>
          <h1>Coffee Shops</h1>

          <Button
            variant="primary"
            onClick={() => this.setState({ modalShow: true })}
          >
            I am a barista!
          </Button>

          {/* wrap this in a file and import */}
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => this.setState({ modalShow: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Hi barista!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row className="show-grid">
                  <Col xs={12} md={6}>
                    <h4>Which coffeee shop do you work at?</h4>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Coffee Shops
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {coffeeShopsTextAssets.map(textAsset => (
                          <Dropdown.Item
                            key={textAsset.id}
                            href={`/${textAsset.id}/order`}
                          >
                            {textAsset.coffeeshop_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col xs={12} md={6}>
                    <h4>Didn't find your coffee shop? Register now!</h4>
                    <RegisterForm
                      onCoffeeShopRegistration={
                        this.handleCoffeeShopRegistration
                      }
                    />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

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
            {coffeeShopsTextAssets.map(textAssets => {
              console.log(textAssets);
              return (
                <CoffeeShopsComponent
                  key={textAssets.id}
                  id={textAssets.id}
                  coffeeshop_name={textAssets.coffeeshop_name}
                  // description={textAssets.shortDescription}
                  image={GreyBox}
                />
              );
            })}
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
