import { SliderPicker } from 'react-color';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    color: '',
  };

  handleChange = color => {
    this.setState({ color: color.hex }, this.sendState());
  };

  sendState = () => {
    const { color } = this.state;
    return fetch(`set?main-color=${color}`);
  };

  render() {
    return (
      <>
        <SliderPicker />
      </>
    );
  }
}
