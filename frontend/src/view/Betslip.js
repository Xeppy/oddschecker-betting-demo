import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayerCard from '../components/PlayerCard';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: 'inline-flex',
    float: 'left',
    marginLeft: 20,
  },
  container: {
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
  },
  paper : {
    width: '100%',
    margin: 25,
  },
  menu: {
    float: 'right'
  }
});

const options = [
  'Show Odds which are more than 2',
  'Show Odds which are less than 2',
];

class SimpleListMenu extends React.Component {
  state = {
    anchorEl: null,
    loading: true,
    data: [],
    selectedIndex: 0,
  };

  fireFetchEvent = (index) => {
    fetch('http://localhost:4000/decimalOdds' + ( index === 0 ? 'More' : 'Less' ) + 'ThanTwo')
    .then(response => response.json())
    .then(data => this.setState({
      loading: false,
      data
    }));
  }

  componentDidMount() {
    this.fireFetchEvent(0);
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.fireFetchEvent(index);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  validateInput = (e) => {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }


  render() {
    const { classes } = this.props;
    const { anchorEl, data, loading } = this.state;

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
        <h1 className={classes.title}>Betslip</h1>
          <div className={classes.menu}>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Select Odds"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary="Select Odds"
                  secondary={options[this.state.selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <Button
              variant="outlined"
              onClick={this.props.handlePageToggle}
            >
              Place Bets
            </Button>
            </div>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16}>
                {loading ? null : (
                  <PlayerCard
                    data={data}
                    validateInput={this.validateInput}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListMenu);
