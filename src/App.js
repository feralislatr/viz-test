import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HierarchyComponent from './components/hierarchyComponent';
import './index.css';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <HierarchyComponent />
      </div>
    );
  }
}

export default App;
