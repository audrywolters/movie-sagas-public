import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <>
        <h3>you're in details </h3>   
        <p>This is the details page for item with id { this.props.match.params.id }!</p>
        
      </>
    );
  }
  
}


const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Details );