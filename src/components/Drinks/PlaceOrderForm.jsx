import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class SubmitOrderForm extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOrdersChange = this.handleOrdersChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.state = {
      name: "",
      orders: "",
      startDate: new Date()
    };
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleOrdersChange(e) {
    this.setState({ orders: e.target.value });
  }

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleOrderSubmit(e) {
    e.preventDefault();
    this.props.onOrderSubmit(this.state);
  }

  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          this.handleOrderSubmit(e);
        }}
      >
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            placeholder="Enter full name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <Form.Text className="text-muted">i.e. Tom Cruise</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Orders</Form.Label>
          <Form.Control
            placeholder="Enter your orders"
            value={this.state.orders}
            onChange={this.handleOrdersChange}
          />
          <Form.Text className="text-muted">
            i.e. Mocha*2, Ice Coffee*3
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Pick-up Time</Form.Label>
          <Form.Text className="text-muted">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    );
  }
}
