import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {

  render() {
    return (
      <>
        <h3>you're in detail</h3>                

          {/* {this.props.reduxState.movies.map((movie) => 
                      <li key={movie.id}>
                          {movie.title}
                          <img src={ movie.poster } />
                          <span>{ movie.description }</span>
                      </li>
                  )}  */}
{/* 
        <div className="itemContainer">
          <img
            src={ this.props.pizza.image_path }
            alt={ this.props.pizza.name }
          />
          <h5>{ this.props.pizza.name }</h5>
          <span>{ this.props.pizza.description }</span>
          <h5 className="pizzaPrice">{ this.props.pizza.price }</h5>
          <button>Add to Cart</button>
        </div> */}

      </>
    );  
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect( mapReduxStateToProps )( Detail );