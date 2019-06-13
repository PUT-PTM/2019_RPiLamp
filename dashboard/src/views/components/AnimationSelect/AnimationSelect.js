import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default class TurnLight extends Component {
  state = {
    selectedAnimation: '0',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ selectedAnimation: value }, () => {
      return fetch(`http://192.168.1.123/set?animation=${value}`, {
        mode: 'no-cors',
      });
    });
  };

  render() {
    const { selectedAnimation } = this.state;

    return (
      <>
        <FormControl component="fieldset">
          <FormLabel component="legend">Animations</FormLabel>
          <RadioGroup
            aria-label="Animation"
            name="animation"
            value={selectedAnimation}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel value="0" control={<Radio />} label="none" />
            <FormControlLabel value="7" control={<Radio />} label="Carousel" />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Carousel fade"
            />
            <FormControlLabel value="12" control={<Radio />} label="Rainbow" />
          </RadioGroup>
        </FormControl>
      </>
    );
  }
}
