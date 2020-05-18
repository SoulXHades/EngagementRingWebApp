import React, { Component } from 'react';
import axios from 'axios';

// self made components
import SearchBar from './components/SearchBar';
import RingPost from './components/RingPost';

// @material-ui
import Grid from '@material-ui/core/Grid';


class Home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            diamondData: null,
            searchWord: "",
        };

        // ref: https://codeburst.io/binding-functions-in-react-b168d2d006cb
        // ref to explaining why need binding to own class for event callbacks
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event)
    {
        // set the new value input by the user as the state
        this.setState({
            searchWord: event.target.value,
        });
    }

    render() 
    {
        return (
            <div className="center">
                <div className="center">
                    <SearchBar 
                        options={Array.from(new Set(this.getRingList().map((option) => option.ringName)))}
                        value={this.state.searchWord}
                        handleChangeValue={this.handleChange}
                    />
                </div>
                <div className="containerRings">
                    <Grid container spacing={1}>
                        <CreateRingPosts ringsInfo={this.getRingList()}/>
                    </Grid>
                </div>
            </div>
        );
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

const CreateRingPosts = (props) => {
    return (
        props.ringsInfo.map((ring) => {
            return (
                <Grid item>
                    <RingPost ringInfo={ring}/>
                </Grid>
            );
    }));
}

export default Home
