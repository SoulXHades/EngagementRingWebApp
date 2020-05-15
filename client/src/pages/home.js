import React, { Component } from 'react';
import axios from 'axios';

// @material-ui
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class Home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            diamondData: null,
        };
    }

    componentDidMount()
    {
        axios.get('/getAllDiamonds')
            .then(res => {
                console.log(res.data)
                this.setState({
                    diamondData: res.data,
                })
            })
            .catch(err => console.log(err));
    }

    render() 
    {
        return (
            <div className="center">
                <Autocomplete
                    id="searchRings"
                    // options={this.state.diamondData.map((option) => option.ringName)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search..."
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
            </div>
        )
    }
}

export default Home
