import React, { Component } from "react";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      textField: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCoffeeShopRegistration(this.state.textField);
    this.setState({ textField: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="input-group my-1">
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
    );
  }
}
