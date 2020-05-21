import React, { Component } from 'react'

// @material-ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export class Filters extends Component {
    priceList = [
        "<$1000",
        "$1000-$2000",
        "$2000-$3000",
        "$3000-$4000",
        "$4000-$5000",
        ">$5000"
    ];

    render() {
        return (
            <div class="containerFilters">
                <b>Shop</b>
                <Autocomplete
                    multiple
                    style={{width: "auto"}}
                    options={this.props.shopList}
                    filterSelectedOptions
                    size="small"
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
                    style={{width: "auto"}}
                    options={this.props.ringCarats}
                    filterSelectedOptions
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by carats..."
                        />
                    )}
                />
                <br /><b>Diamond clarity</b>
                <Autocomplete
                    multiple
                    style={{width: "auto"}}
                    options={this.props.diamondClarity}
                    filterSelectedOptions
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by diamond clarity..."
                        />
                    )}
                />
                <br /><b>Diamond color</b>
                <Autocomplete
                    multiple
                    style={{width: "auto"}}
                    options={this.props.diamondColors}
                    filterSelectedOptions
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Filter by diamond colors..."
                        />
                    )}
                />
                <br /><b>Price</b>
                <Autocomplete
                    multiple
                    style={{width: "auto"}}
                    options={this.priceList}
                    filterSelectedOptions
                    size="small"
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