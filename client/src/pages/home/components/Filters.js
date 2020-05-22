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
                    id="Shop"
                    multiple
                    style={{width: "auto"}}
                    options={this.props.shopList}
                    onChange={this.props.handleShopFilterValue}
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
                    id="Carat"
                    multiple
                    style={{width: "auto"}}
                    options={this.props.ringCarats}
                    onChange={this.props.handleCaratFilterValue}
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
                    id="Clarity"
                    multiple
                    style={{width: "auto"}}
                    options={this.props.diamondClarity}
                    onChange={this.props.handleClarityFilterValue}
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
                    id="Color"
                    multiple
                    style={{width: "auto"}}
                    options={this.props.diamondColors}
                    onChange={this.props.handleColorFilterValue}
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
                    id="Price"
                    multiple
                    style={{width: "auto"}}
                    options={this.priceList}
                    onChange={this.props.handlePriceFilterValue}
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