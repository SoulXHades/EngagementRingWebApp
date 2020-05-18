import React, { Component } from 'react'

// @material-ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class SearchBar extends Component 
{
    render() {
        return (
            <div className="containerSearch">
                    <Autocomplete // for Search bar for ring names
                        id="searchRings"
                        // creating an Array of ring names from the JSON object using map(),
                        // convert to Set to to remove duplicated ring names, and convert back to Array.
                        options={this.props.options}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search ring names..."
                            margin="dense"
                            variant="outlined"
                            value={this.props.value}
                            onChange={this.props.handleChangeValue}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                    />
                </div>
        )
    }
}

export default SearchBar
