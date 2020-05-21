import React, { Component } from 'react'

// @material-ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export class Filters extends Component {
    render() {
        const top100Films = [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 }];
        return (
            <div class="containerFilters">
                <b>Shop</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by shops..."
                        />
                    )}
                />
                <br /><b>Carat</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by carats..."
                        />
                    )}
                />
                <br /><b>Diamond color</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by diamond colors..."
                        />
                    )}
                />
                <br /><b>Diamond shape</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by diamond shapes..."
                        />
                    )}
                />
                <br /><b>Diamond cut</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by diamond cuts..."
                        />
                    )}
                />
                <br /><b>Price</b>
                <Autocomplete
                    multiple
                    style={{width: 400}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by price..."
                        />
                    )}
                />
            </div>
        );
    }
}

export default Filters