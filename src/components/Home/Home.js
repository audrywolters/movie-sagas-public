import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Home/Home.css';

class Home extends Component {

  componentDidMount() {
    // get all the movie data right away
    // so it will display everything on load
    this.props.dispatch({ type: 'FETCH_MOVIES' });
    this.props.dispatch({ type: 'FETCH_DETAILS' });
  }

  goToDetailsPage = ( event ) => {
    // go to the details page 
    // of the poster that was clicked on

    // this is only client front end display stuff
    // we want the ID so we can dig for the detials in redux

    this.props.history.push( `/details/${ event.target.name }` )
  }
  
  render() {
    return (
      <>
        <h2>Welcome to the Super Cool Movie Page</h2>                
        <ul>
          {/* show all the movies in the DB */}
          { this.props.reduxState.movies.map( ( movie ) => 
                      <li key={ movie.id }>
                        <img  src={ movie.poster } 
                              onClick={ this.goToDetailsPage } 
                              name={ movie.id } 
                              alt={ movie.title } 
                        />
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
