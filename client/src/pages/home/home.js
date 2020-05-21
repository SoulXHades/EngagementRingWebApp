import React, { Component } from 'react';
import axios from 'axios';

// self made components
import SearchBar from './components/SearchBar';
import RingPost from './components/RingPost';
import PageNavigator from './components/PageNavigator';

// @material-ui
import Grid from '@material-ui/core/Grid';
import { Filters } from './components/Filters';


class Home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            allDiamondClarity: [],
            allDiamondColors: [],
            allRingCarats: [],
            allRingNames: [],
            currentPage: 1,
            diamondData: null,
            displayRings: [],
            numOfPages: 1,
            ringList: [],
            searchWord: "",
            shopList: [],
        };

        // ref: https://codeburst.io/binding-functions-in-react-b168d2d006cb
        // ref to explaining why need binding to own class for event callbacks
        this.pageChange = this.pageChange.bind(this);
        this.searchValChanged_auto = this.searchValChanged_auto.bind(this);
        this.searchValChanged_textfield = this.searchValChanged_textfield.bind(this);
    }

    componentDidUpdate()
    {
        // when user click forward or back button, this will trigger
        window.onpopstate = e => {
            // to get page number
            const query = new URLSearchParams(this.props.location.search);
            const pageNumber = query.get('p') === null ? 1 : parseInt(query.get('p'));

            // call the pageChange() event handler to handle what rings to display and set current page number
            this.pageChange(null, pageNumber);
        }
    }

    // executes when page loads for the 1st time
    componentDidMount()
    {
        axios.get('/getAllDiamonds')
            .then(res => {
                // print out the object obtained from the API
                console.log(res.data);
                // to get the params of the URL to know what page is it
                const query = new URLSearchParams(this.props.location.search);
                this.setState({
                    // set 1 if there is no page number means home page at URL "/"
                    currentPage: query.get('p') === null ? 1 : parseInt(query.get('p')),
                    diamondData: res.data,
                }, () => {
                    // this in the callback function to counter setState being async when update diamondData
                    var tempRingList = this.getRingList("");

                    this.setState({ 
                        allDiamondClarity: this.remover(tempRingList.map((option) => option.ringDiaClarity)),
                        allDiamondColors: this.remover(tempRingList.map((option) => option.ringDiaColor)),
                        allRingCarats: this.remover(tempRingList.map((option) => option.ringCarat)),
                        allRingNames: this.remover(tempRingList.map((option) => option.ringName)),
                        displayRings: tempRingList.slice((this.state.currentPage - 1) * 9, this.state.currentPage * 9),
                        numOfPages: Math.ceil(tempRingList.length/9),
                        ringList: tempRingList,
                        shopList: this.getShopList(),
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
        
        if (this.state.currentPage !== nextState.currentPage)
            return true;
        
        if (this.state.displayRings !== nextState.displayRings)
            return true;

        if (this.state.ringList !== nextState.ringList)
            return true;
        
        if (this.state.shopList !== nextState.shopList)
            return true;
        
        return false;
    }

    // event handler to handle what rings to display and set current page number
    pageChange(event, page)
    {
        this.setState({
            currentPage: page,
            displayRings: this.state.ringList.slice((page - 1) * 9, page * 9),
        });
        // to auto scroll window back to the top after changed page
        window.scrollTo(0, 0);
    }

    searchValChanged(value)
    {
        // change url without reloading the page to remove /p?=:pageNum if user search something
        // when user is in another page instead of page 1
        window.history.pushState("", "DiaMiner", "/");

        // get list of rings based on what user typed on search bar to filter
        const tempRingList = this.getRingList(value);

        this.setState({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
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
            <Grid container>
                <Grid item xs={3}>
                    <Filters
                        diamondClarity={this.state.allDiamondClarity}
                        diamondColors={this.state.allDiamondColors}
                        diamondShapes={this.state.allDiamondShapes}
                        ringCarats={this.state.allRingCarats}
                        ringPrices={this.state.allRingPrices}
                        shopList={this.state.shopList}
                    />
                </Grid>
                <Grid item xs>
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
                            <CreateRingPosts ringsInfo={this.state.displayRings}/>
                        </Grid>
                    </div>
                    <PageNavigator
                        numOfPages={this.state.numOfPages}
                        currentPage={this.state.currentPage}
                        pageChangeHandler={this.pageChange}
                    />
                </Grid>
            </Grid>
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

    // get a list of shop names
    getShopList()
    {
        var shopList = [];

        for (var key in this.state.diamondData)
        {
            var val = this.state.diamondData[key];

            for (var shop in val)
                shopList.push(shop);
        }
        console.log(shopList);

        return shopList;
    }

    // removes duplicates and "N/A" string from an array as well as sort them
    remover(list)
    {
        // remove duplicates by converting to Set then back to Array
        var tempList = Array.from(new Set(list));

        // remove "N/A" from the array and sort them in accending order
        return tempList.filter((str) => { 
            return  str !== "N/A";
        })
        .sort();
    }
}

const CreateRingPosts = (props) => {
    return (
        props.ringsInfo.map((ring) => {
            return (
                <Grid item xs={4}>
                    <RingPost ringInfo={ring}/>
                </Grid>
            );
    }));
}

export default Home
