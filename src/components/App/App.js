import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';
import '../App/App.css';

class App extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
      <>
        <Router> 
          <Route exact path="/"      component={ Home } />
          <Route path='/details/:id' component={ Details } />
          <Route path="/edit/:id"    component={ Edit } />
        </Router>     
      </>
    );
  }
}

export default App;
