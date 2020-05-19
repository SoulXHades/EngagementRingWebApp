import React, { Component } from 'react';
import axios from 'axios';

// self made components
import SearchBar from './components/SearchBar';
import RingPost from './components/RingPost';

// @material-ui
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';


class Home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            allRingNames: [],
            diamondData: null,
            numOfPages: 1,
            ringList: [],
            searchWord: "",
        };

        // ref: https://codeburst.io/binding-functions-in-react-b168d2d006cb
        // ref to explaining why need binding to own class for event callbacks
        this.searchValChanged_auto = this.searchValChanged_auto.bind(this);
        this.searchValChanged_textfield = this.searchValChanged_textfield.bind(this);
    }

    componentDidMount()
    {
        axios.get('/getAllDiamonds')
            .then(res => {
                console.log(res.data);
                this.setState({
                    diamondData: res.data,
                }, () => {
                    // this in the callback function to counter setState being async when update diamondData
                    var tempRingList = this.getRingList("");

                    this.setState({ 
                        allRingNames: Array.from(new Set(tempRingList.map((option) => option.ringName))),
                        numOfPages: Math.ceil(tempRingList.length/9),
                        ringList: tempRingList,
                    });
                });
            })
            .catch(err => console.log(err));
    }

    // only render if any state really changed
    // especially helps to solve onChange on SearchBar keeps triggering re-render whenever user types a letter
    shouldComponentUpdate(nextProps, nextState)
    {
        if (this.state.allRingNames !== nextState.allRingNames)
            return true;

        if (this.state.ringList !== nextState.ringList)
            return true;
        
        return false;
    }

    searchValChanged(value)
    {
        this.setState({
            ringList: this.getRingList(value),
            searchWord: value,
        });
    }

    searchValChanged_auto(event, value)
    {
        // for autocomplete element, if searchbar is empty, value returns null
        if (value === null)
            value = "";

        this.searchValChanged(value);
    }

    searchValChanged_textfield(event)
    {
        // only filter when user pressed enter or when press backspace resulted in empty search bar
        if (event.keyCode === 13 || event.target.value === "")
            this.searchValChanged(event.target.value);
    }

    render() 
    {
        return (
            <div className="center">
                <div className="center">
                    <SearchBar 
                        options={this.state.allRingNames}
                        value={this.state.searchWord}
                        handleChangeValue_auto={this.searchValChanged_auto}
                        handleChangeValue_textfield={this.searchValChanged_textfield}
                    />
                </div>
                <div className="containerRings">
                    <Grid container spacing={1}>
                        <CreateRingPosts ringsInfo={this.state.ringList}/>
                    </Grid>
                </div>
                <Pagination count={this.state.numOfPages} showFirstButton showLastButton/>
            </div>
        );
    }

    // to get a list of rings by parsing the JSON gotten from the website's API
    getRingList(searchWord)
    {
        var ringList = [];
        var filteredRingList = [];

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

        // check if user search content before applying filtering
        if (searchWord !== "")
        {
            filteredRingList = ringList.filter(ring => {
                const ringName = ring.ringName.toLowerCase();
                const filter = searchWord.toLowerCase();
                
                return ringName.includes(filter);
            });

            // return filteredRingList if filteredRingList is not empty else return ringList
            if (filteredRingList.length !== 0)
                return filteredRingList;
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
