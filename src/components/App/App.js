import React, { Component } from 'react';
import Home from '../Home/Home';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>hi in App</h1>
        <Home />
      </div>
    );
  }
}

export default App;
