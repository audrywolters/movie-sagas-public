import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// create the rootSaga generator function
function* rootSaga() {
    // retrieve movies from DB
    yield takeEvery( 'FETCH_MOVIES', getMovies );
}

function* getMovies(){
    try {
        // get movies from DB
        const response = yield axios.get( '/movies' );
        // and send them off to store in redux
        yield put( { type: 'SET_MOVIES', payload: response.data } )
    } catch ( error ) {
      console.log( 'error with MOVIES get request...', error );
    }
  }


// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// here is where we keep the movies data
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
// const genres = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_GENRES':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        // genres
    }),
    // add sagaMiddleware to our store
    applyMiddleware( sagaMiddleware, logger )
);

// pass rootSaga into our sagaMiddleware
sagaMiddleware.run( rootSaga );

ReactDOM.render( <Provider store={storeInstance}><App /></Provider>, 
    document.getElementById( 'root' ) ); 

registerServiceWorker();
