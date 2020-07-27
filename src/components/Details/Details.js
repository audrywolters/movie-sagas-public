import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Details/Details.css';

class Details extends Component {

  state = {
    movieID: 0,
    movie: [],
    genres: []
  }

  componentDidMount() {  
    // the router could only send us so much data - the movie ID
    // so we have to find the stuff that belongs to it
    this.setMovie();  
    this.setGenres();
  }

  setMovie = () => {
    // let's make this easy to read
    
    // set our ID in a nice variable
    // this is the ID of the poster we just clicked on
    let thisMovieID = this.props.match.params.id;

    // make a nice variable to store our movie data
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
        movieID: thisMovieID,
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

    // prepare an object to catch our specific movie's data
    let thisDetail = {};

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

  goToEditPage = ( event ) => {
    // go to the edit page
    // and send the movie id along in the path
    this.props.history.push( `/edit/${ this.state.movieID }` )
  }


  render() {
    return (
      <div className="detailsBox">
        {/* display movie info */}
        <div className="detailsTitle">{ this.state.movie.title }</div>
        <div className="detailsDescription">{ this.state.movie.description }</div>

        <div className="genresBox">
          <div className="genresTitle">Genres include</div>
          { this.state.genres.map( ( genre, index ) => 
                        <div key={ index }>
                          { genre }
                        </div>
                    )}
        </div>

        <button onClick={ this.props.history.goBack }>Back to Home</button>
        <button name={ this.state.movie.id }
                onClick={ this.goToEditPage }>Edit</button>
      </div>
    );
  }
  
}


const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Details );