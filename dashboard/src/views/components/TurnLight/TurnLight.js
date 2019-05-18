import Switch from '@material-ui/core/Switch';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    isChecked: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, this.sendState);
  };

  sendState = () => {
    const { isChecked } = this.state;
    return fetch(`set?switch-light=${isChecked}`);
  };

  render() {
    const { isChecked } = this.state;

    return (
      <>
        <Switch
          checked={isChecked}
          onChange={this.handleChange('isChecked')}
          value=""
          color="primary"
        />
      </>
    );
  }
}
