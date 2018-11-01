import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import PlayerCard from '../components/PlayerCard';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
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

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    
    fetch('http://localhost:4000/decimalOdds' + ( index === 0 ? 'More' : 'Less' ) + 'ThanTwo')
    .then(response => response.json())
    .then(data => this.setState({ 
      loading: false,
      data
    }));
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, data, loading } = this.state;

    return (
      <div className={classes.root}>
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
        <Grid container>
          <Grid item>
          {loading ? null : (
            <Grid container spacing={16}>
              <PlayerCard
                data={data}
              />
            </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListMenu);
