import { CirclePicker } from 'react-color';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    color: '#2196f3',
  };

  handleChangeComplete = color => {
    const colorHex = color.hex;
    this.setState({ color: colorHex }, () => {
      const trueColor = colorHex.replace('#', '');
      return fetch(`http://192.168.1.123/set?color=${trueColor}`, {
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
