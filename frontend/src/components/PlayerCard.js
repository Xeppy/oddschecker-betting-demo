import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function PlayerCard(props) {
  const { classes, data } = props;

  console.log(data);

  return data.map((player, i) => 
    <div key={i}>
    {player.odds.map((ind, j) => {
      return (
        <Paper className={classes.root} elevation={1} key={j} spacing={10}>
          <Typography component="h3">
            {player.name} with {ind.bookmakerCode}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {ind.oddsDecimal}
          </Typography>
          <Button size="small">Learn More</Button>
        </Paper>
      )})}
    </div>  
  )
}

PlayerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerCard);
