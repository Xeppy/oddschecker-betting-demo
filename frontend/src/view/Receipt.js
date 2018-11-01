import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateValue, clearStakes } from '../store/actions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({

  paper : {
    width: '50%',
    margin: '0 auto',
    padding: 20,
  },

});

class Receipt extends Component {
  componentDidMount() {
    this.props.dispatch(updateValue(this.props.stakes));
    this.props.dispatch(clearStakes());
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className ={classes.paper}>
        <h1>Your Bet has been placed</h1>
        <h2>Your total stake is: {this.props.totalStake}</h2>
        <Button
          variant="outlined"
          onClick={this.props.handlePageToggle}
        >
        Back to placing Bets
        </Button>
    </Paper>
    )
  }
}


const mapStateToProps = state => ({
  stakes: state.stakes,
  totalStake: state.totalStake
});


export default connect(mapStateToProps)(withStyles(styles)(Receipt));