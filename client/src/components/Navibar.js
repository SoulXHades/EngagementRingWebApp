import React, { Component } from 'react';
import Link from 'react-router-dom/Link';   // to link the Navigation bar to the pages

// @material-ui
// import specific ones instead of the whole library for optimization
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Navibar extends Component {
    render() {
        return (
            <AppBar>    
                <Toolbar className="navi-container">
                    <Button color="inherit" component={Link} to="/"><b>Home</b></Button>
                    <Button color="inherit" component={Link} to="/about"><b>About</b></Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navibar
