import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class TurnLight extends Component {
  state = {
    selectedAnimation: 'animation1',
  };

  handleChange = event => {
    this.setState({ selectedAnimation: event.target.value }, this.sendState());
  };

  sendState = () => {
    // const { selectedAnimation } = this.state;
    // return fetch(`set?selected-animation=${selectedAnimation}`);
  };

  render() {
    const { selectedAnimation } = this.state;

    return (
      <>
        <FormControl>
          <InputLabel htmlFor="animation">Animation</InputLabel>
          <Select
            value={selectedAnimation}
            onChange={this.handleChange}
            inputProps={{
              name: 'animation',
              id: 'animation',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="animation1">Animation 1</MenuItem>
            <MenuItem value="animation2">Animation 2</MenuItem>
            <MenuItem value="animation3">Animation 3</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
}
