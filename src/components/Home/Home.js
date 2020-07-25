import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Detail/Detail';
import '../Home/Home.css';

class Home extends Component {

  componentDidMount() {
    // get all the movie data so it will display on load
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }

  goToDetail = ( event ) => {
    console.log( 'detail of: ', event.target.name );
  }
  
  render() {
    return (
      <>
        <h2>you're in home</h2>                
        <ul>
          { this.props.reduxState.movies.map( ( movie ) => 
                      <li key={ movie.id }>
                      <img src={ movie.poster } onClick={ this.goToDetail } name={ movie.id } alt={ movie.title } />
                          <h3>{ movie.title }</h3>
                          <span>{ movie.description }</span>
                      </li>
                  )} 
        </ul>
      </>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Home );