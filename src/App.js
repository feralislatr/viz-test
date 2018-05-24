import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Barchart from './components/barchart';
// import HorizontalChart from './components/horizontalchart';
// import LineChart from './components/linechart';
import { Col, FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import TreeChart from './components/treechart';
import styles from './index.scss';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TreeChart />
      </div>
    );
  }
}

export default App;
