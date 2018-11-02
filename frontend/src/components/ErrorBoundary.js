import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }


    render() {
      if (this.state.hasError) {
        return (
        <Fragment>
          <h1>Something went wrong</h1>
          <h3>Please refresh the page and try again</h3>
        </Fragment>
        );
      }
      return this.props.children;
    }
}

export default ErrorBoundary;