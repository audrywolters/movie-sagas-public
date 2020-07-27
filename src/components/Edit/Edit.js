import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Edit/Edit.css';

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

  saveDetails = () => {

    // prepare to update!

    // make a nice object server can understand
    let updateData = {
                        title: this.state.title, 
                        description: this.state.description,
                        movieID: this.props.match.params.id
                     }

    // ask saga to help us do it
    this.props.dispatch({ type: 'SAVE_DETAILS', payload: updateData });

    // also take up back to the details page
    this.goBackToDetail();
  }


  render() {
    return (
      <div className="detailsBox">
          <div className="detailsTitle">Edit Movie</div>


          <label>Title</label>
          <br />
          <input className="titleInput" type='text' value={ this.state.title } onChange={ this.onTitleChange } />

          <br />
          <br />
          
          <label>Description</label>
          <br />
          <textarea className="descriptionTextarea" value={ this.state.description } onChange={ this.onDescriptionChange }></textarea>

          <div className="genresBox">
            <div className="genresTitle">Genres include</div>
              { this.state.genres.map( ( genre, index ) => 
                            <div key={ index }>
                              { genre }
                            </div>
                        )}
          </div>

          <button onClick={ this.goBackToDetail }>Cancel</button>  
          <button name={ this.state.movie.id }
                  onClick={ this.saveDetails }>Save</button>
      </div>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Edit );
