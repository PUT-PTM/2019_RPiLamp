import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import TurnLight from '../components/TurnLight/TurnLight';
import AnimationSelect from '../components/AnimationSelect/AnimationSelect';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
    typography: {
      useNextVariants: true,
    },
  },
});

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 25,
    textAlign: 'center',
  },
});

function App(props) {
  const { classes } = props;

  return (
    <div className={(classes.root, 'App')}>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={32}>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <TurnLight />
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className={classes.paper}>
              <AnimationSelect />
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
