import React, { Component } from 'react';
import Betslip from './view/Betslip';
import Receipt from './view/Receipt';
import './App.css';

class App extends Component {
  state = {
    page: 1,
  }

  handlePageToggle = () => {
    this.setState({
      page: (this.state.page === 1 ? 2 : 1)
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.page === 1 ? <Betslip handlePageToggle={this.handlePageToggle} /> : <Receipt handlePageToggle={this.handlePageToggle} />}
      </div>
    );
  }
}

export default App;
