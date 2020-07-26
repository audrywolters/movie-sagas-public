import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {

    state = {
        movie: [],
        genres: [],
        title: '',
        description: ''
      }
    
  componentDidMount() {  
    // we don't have much data - the movie ID only
    // so we have to find it...
    this.setMovie();  
    this.setGenres();
  }

  // i shouldn't have to do this everytime. 
  // i just don't know how else to pass data
  setMovie = () => {
    // set our ID in a nice variable
    // this is the ID of the poster we just clicked on
    let thisMovieID = this.props.match.params.id;

    // make a nice variable to store our movie 
    // when we find it
    let coolMovie = [];

    // loop for matching IDs
    for ( const reduxMovie of this.props.reduxState.movies ) {   
      if ( Number( reduxMovie.id ) === Number( thisMovieID ) ) {
        // that's it! grab it
        coolMovie = reduxMovie;
      }
    }

    // now we can keep it safe
    this.setState({
        movie: coolMovie
    })
  }

  setGenres = () => {
    // let's make this easier to read
    // grab the ID of the poster clicked on (of which we are about to load the details of)
    let thisMovieID = this.props.match.params.id;

    // keep all the data in a nice variable
    // (data is a giant array of all the movies' stuff)
    let allReduxDetails = this.props.reduxState.details;

    // prepare an object to catch our specific movie
    let thisDetail = {};

    // i'm not certain about this
    // if there were 10,000 movies, this loop would take a long time
    // the alternative is to hit the server on every click - that's a lot of traffic

    // loop to find the matching ID
    for ( const reduxDetail of allReduxDetails ) {   
      if ( Number( reduxDetail.id ) === Number( thisMovieID ) ) {
        // that's it! grab it
        thisDetail = reduxDetail;
      }
    }

    // now we can keep it safe
    this.setState({
        genres: thisDetail.array_agg
    })

  }  

  saveTitleDescription = () => {

  }

  onTitleChange = ( event ) => {
    this.setState({
      title: event.target.value
    })
  }

  onDescriptionChange = ( event ) => {
    this.setState({
      description: event.target.value
    })
  }

  goBackToDetail = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <>  
        <input type='text' value={ this.state.title } onChange={ this.onTitleChange } />
        <br />
        <textarea value={ this.state.description } onChange={ this.onDescriptionChange }></textarea>

        <h4>Genres include:</h4>
        <ul>
        { this.state.genres.map( ( genre, index ) => 
                      <li key={ index }>
                        { genre }
                      </li>
                  )}
        </ul>
        <button name={ this.state.movie.id }
                onClick={ this.saveTitleDescription }>Save</button>
        <button onClick={ this.goBackToDetail }>Cancel</button>
        
      </>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Edit );