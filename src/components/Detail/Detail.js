import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {


  render() {
    return (
      <>
        <h3>you're in detail </h3>   
        <p>This is the details page for item with id { this.props.match.params.id }!</p>
      </>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Detail );