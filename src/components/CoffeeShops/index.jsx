import React, { Component } from "react";
import { Button, Modal, Dropdown, Container, Row, Col } from "react-bootstrap";
import classnames from "classnames";
import CoffeeShopsComponent from "./CoffeeShopsComponent";
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
  }

  // Get the text sample data from the back end
  componentDidMount() {
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
                        Dropdown Button
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col xs={12} md={6}>
                    <h4>Didn't find your coffee shop? Register now!</h4>
                    <form
                      onSubmit={this.handleSubmit}
                      className="input-group my-1"
                    >
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.textField}
                        name="textField"
                        className="form-control"
                        placeholder="Enter coffee shop name here..."
                        aria-label="Enter coffee shop name here..."
                      />
                      <button type="submit" className="btn btn-primary ml-2">
                        Register
                      </button>
                    </form>
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
            {coffeeShopsTextAssets.map(textAssets => (
              <CoffeeShopsComponent
                id={textAssets.id}
                coffeeshop_name={textAssets.coffeeshop_name}
                // description={textAssets.shortDescription}
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
