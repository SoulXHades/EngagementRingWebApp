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
                        // value helps to prevent searchword from disappearing when user click away 
                        // from search bar
                        value={this.props.value}
                        // triggers onChange when user press options recommended or delete search word
                        onChange={this.props.handleChangeValue_auto}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search ring names..."
                            margin="dense"
                            variant="outlined"
                            // value helps to prevent searchword from disappearing when user click away 
                            // from search bar
                            value={this.props.value}
                            // triggers when user press any key
                            onKeyUp={this.props.handleChangeValue_textfield}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                    />
                </div>
        )
    }
}

export default SearchBar
