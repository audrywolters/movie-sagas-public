import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

  state = {
    movie: [],
    genres: []
  }

  componentDidMount() {  
    this.setMovie();  
    this.setGenres();
  }

  setMovie = () => {
    // set our ID in a nice variable
    // this is the ID of the poster we just clicked on
    let thisMovieID = this.props.match.params.id;

    // make a nice variable to store our movie when we find it
    let coolMovie = [];

    // now for the other shiv
    for ( const movie of this.props.reduxState.movies ) {   
      if ( Number( movie.id ) === Number( thisMovieID ) ) {
        // that's it! grab it
        coolMovie = movie;
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
    let details = this.props.reduxState.details;

    // prepare an object to catch our specific movie
    let thisDetail = {};


    // i'm not certain about this
    // if there were 10,000 movies, this loop would take a long time
    // the alternative is to hit the server on every click - that's a lot of traffic

    // loop to find the matching ID
    for ( const detail_ of details ) {   
      if ( Number( detail_.id ) === Number( thisMovieID ) ) {
        // that's it! grab it
        thisDetail = detail_;
      }
    }

    // now we can keep it safe
    this.setState({
        genres: thisDetail.array_agg
    })

  }

  render() {
    return (
      <>
        <h3>{ this.state.movie.title } </h3>
        <div>{ this.state.movie.description }</div>

        <h4>Genres include:</h4>
        <ul>
        { this.state.genres.map( ( genre, index ) => 
                      <li key={ index }>
                        { genre }
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

export default connect( mapReduxStateToProps )( Details );