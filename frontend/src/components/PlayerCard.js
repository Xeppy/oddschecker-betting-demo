import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import StakeHandler from './StakeHandler';

const styles = theme => ({
  title: {
    fontSize: 22,
    margin: 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit * 2,
    background: '#ff7423'
  },
  pos: {
    marginTop: 2,
    marginBottom: 8,
  },
  poundSign: {
    paddingRight: 10,
    fontSize: 28,
    margin: 0,
  },
  flex: {
    display: 'inline-flex'
  },
  input: {
    width: 100,
    fontSize: 28
  },
  Grid: {
    minWidth: '50%'
  }
});

function PlayerCard(props) {
  const { classes, data } = props;

  return (
    <Fragment>
    {data.map((player, i) =>
      <Grid key={i} item className={classes.Grid}>
        {player.odds.map((ind, j) => {
          return (
            <Paper className={classes.paper} key={j} >
              <h2 className={classes.title}>
                {player.name} at {ind.bookmakerCode}
              </h2>
              <h4 className={classes.pos}>
                Odds (Decimal): {ind.oddsDecimal}
              </h4>
                <div className={classes.flex}>
                  <p className={classes.poundSign}>£</p>
                  <StakeHandler render={handleEvent => (
                    <Input type="number" placeholder="0" className={classes.input} onKeyDown={props.validateInput} onBlur={e => handleEvent(player.name + ind.bookmakerCode, e.target.value)} />
                    )}/>
                </div>
            </Paper>
          )})}
      </Grid>
    )}
  </Fragment>
  )
}

PlayerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerCard);
