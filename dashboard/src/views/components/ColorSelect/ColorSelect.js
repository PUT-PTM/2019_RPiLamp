import { CirclePicker } from 'react-color';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    color: '',
  };

  handleChangeComplete = color => {
    this.setState({ color: color.hex }, this.sendState());
  };

  sendState = () => {
    const { color } = this.state;
    return fetch(`set?main-color=${color}`);
  };

  render() {
    const { color } = this.state;

    return (
      <>
        <CirclePicker
          width="100%"
          color={color}
          onChangeComplete={this.handleChangeComplete}
        />
      </>
    );
  }
}
