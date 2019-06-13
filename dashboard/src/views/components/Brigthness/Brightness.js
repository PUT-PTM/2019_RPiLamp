import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  typography: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  slider: {
    padding: '22px 0px',
  },
};

class Brightness extends Component {
  state = {
    brightness: 191,
  };

  handleChange = (event, value) => {
    this.setState({ brightness: value }, () => {
      return fetch(`http://192.168.1.123/set?brightness=${value}`, {
        mode: 'no-cors',
      });
    });
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
        <Typography id="brightness" className={classes.typography}>
          Brightness
        </Typography>
        <Slider
          classes={{ container: classes.slider }}
          aria-labelledby="brightness"
          max={255}
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
