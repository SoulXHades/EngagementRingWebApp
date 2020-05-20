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
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Shops filter"
                        />
                    )}
                />
                Carat
                <Autocomplete
                    multiple
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Favorites"
                        />
                    )}
                />
                Diamond color
                <Autocomplete
                    multiple
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Favorites"
                        />
                    )}
                />
                Diamond shape
                <Autocomplete
                    multiple
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Favorites"
                        />
                    )}
                />
                Diamond cut
                <Autocomplete
                    multiple
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Favorites"
                        />
                    )}
                />
                Price
                <Autocomplete
                    multiple
                    style={{width: 100}}
                    options={top100Films}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Favorites"
                        />
                    )}
                />
            </div>
        );
    }
}

export default Filters