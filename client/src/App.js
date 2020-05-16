import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

// components
import Navibar from './components/Navibar'
// pages
import home from './pages/home/home';
import about from './pages/about';

// @material-ui
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// ref: https://material-ui.com/customization/color/#color
const theme = createMuiTheme(
  {
    palette: 
    {
      primary: 
      {
        light: '#29b6f6',
        main: '#03a9f4',
        dark: '#039be5',
        contrastText: '#fff',
      },
      secondary: 
      {
        light: '#f73378',
        main: '#f50057',
        dark: '#ab003c',
        contrastText: '#fff',
      },
    },
  });

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}

export default App
