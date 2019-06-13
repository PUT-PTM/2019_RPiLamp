import Switch from '@material-ui/core/Switch';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    isChecked: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      const { isChecked } = this.state;
      return fetch(`http://192.168.1.123/set?turn=${isChecked}`, {
        mode: 'no-cors',
      });
    });
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
