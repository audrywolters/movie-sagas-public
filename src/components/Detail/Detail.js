import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {

  componentDidMount() {
    // get all the movie data right away
    // so it will display everything on load
    // do a one time axios request
  }

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