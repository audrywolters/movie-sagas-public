import React, { Component } from 'react';
//import '../Detail/Detail';
import { connect } from 'react-redux';

class Home extends Component {

  componentDidMount() {
    // use component did mount to dispatch an action to request the plantList from the API
    this.props.dispatch({ type: 'FETCH_MOVIES' });
}
  
  render() {
    return (
      <>
        <h2>you're in home</h2>                
        <ul>
          {this.props.reduxState.movies.map((movie) => 
                      <li key={movie.id}>
                          {movie.title}
                          {/* <button onClick={this.removePlant(item.id)}>Git outta here!</button> */}
                      </li>
                  )} 
        </ul>
      </>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

export default connect( mapReduxStateToProps )( Home );