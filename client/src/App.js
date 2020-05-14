import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

// components
import Navibar from "./components/Navibar"
// pages
import home from "./pages/home";
import about from "./pages/about";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navibar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/about" component={about}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App
