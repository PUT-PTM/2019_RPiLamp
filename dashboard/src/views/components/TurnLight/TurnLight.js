import Switch from '@material-ui/core/Switch';
import React, { Component } from 'react';

export default class TurnLight extends Component {
  state = {
    isChecked: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      const { isChecked } = this.state;
      console.log(process.env);
      return fetch(`${process.env.API_URL}set?turn=${isChecked}`, {
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
