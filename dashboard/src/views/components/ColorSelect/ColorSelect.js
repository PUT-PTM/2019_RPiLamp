import { CirclePicker } from 'react-color';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    color: '',
  };

  handleChangeComplete = color => {
    const colorHex = color.hex;
    this.setState({ color: colorHex }, () => {
      const trueColor = colorHex.replace('#', '');
      return fetch(`http://192.168.0.123/set?color=${trueColor}`, {
        mode: 'no-cors',
      });
    });
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
