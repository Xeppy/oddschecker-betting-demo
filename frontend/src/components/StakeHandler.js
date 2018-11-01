import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStakes } from '../store/actions';

class StakeHandler extends Component {

  handleStake = (index, value) => {
    const stakes = {
      index,
      value,
    };
    this.props.dispatch(updateStakes(stakes));
  }

  render() {
    return this.props.render(this.handleStake);
  }
}

export default connect()(StakeHandler);