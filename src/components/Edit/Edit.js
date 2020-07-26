import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {


  render() {
    return (
      <>
        <h2>you're in Edit</h2>
        <p>Checkout this wicked ID {this.props.match.params.id}</p>
      </>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Edit );
