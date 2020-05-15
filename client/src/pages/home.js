import React, { Component } from 'react';
import axios from 'axios';

// @material-ui
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
                console.log(res.data);
                this.setState({
                    diamondData: res.data,
                });
            })
            .catch(err => console.log(err));
    }

    render() 
    {
        return (
            <div className="center">
                <Autocomplete
                    id="searchRings"
                    options={this.getRingList().map((option) => option.ringName)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search ring names..."
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
            </div>
        )
    }

    // to get a list of rings by parsing the JSON gotten from the website's API
    getRingList()
    {
        var ringList = [];

        for (var key in this.state.diamondData)
        {
            var val = this.state.diamondData[key];

            for (var shop in val)
            {
                // get a list of ringsInfo and push them into ringList
                var tempRingList = this.state.diamondData[key][shop];
                ringList.push(...tempRingList);
            }
        }
        
        return ringList;
    }
}

export default Home
