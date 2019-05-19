import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  slider: {
    padding: '22px 0px',
  },
};

class Brightness extends Component {
  state = {
    brightness: 0,
  };

  handleChange = (event, value) => {
    this.setState({ brightness: value });
  };

  sendState = () => {
    const { color } = this.state;
    return fetch(`set?brightness=${color}`);
  };

  render() {
    const { brightness } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Typography id="brightness" align="left">
          Brightness
        </Typography>
        <Slider
          classes={{ container: classes.slider }}
          aria-labelledby="brightness"
          value={brightness}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

Brightness.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Brightness);
