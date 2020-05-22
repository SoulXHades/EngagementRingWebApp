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
            filter: {
                shop: [],
                carat: [],
                diamondClarity: [],
                diamondColor: [],
                price: [],
            },
            numOfPages: 1,
            ringList: [],
            searchWord: "",
            shopList: [],
        };

        // ref: https://codeburst.io/binding-functions-in-react-b168d2d006cb
        // ref to explaining why need binding to own class for event callbacks
        this.shopFilterValChanged = this.shopFilterValChanged.bind(this);
        this.caratFilterValChanged = this.caratFilterValChanged.bind(this);
        this.clarityFilterValChanged = this.clarityFilterValChanged.bind(this);
        this.colorFilterValChanged = this.colorFilterValChanged.bind(this);
        this.priceFilterValChanged = this.priceFilterValChanged.bind(this);
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
                    var tempRingList = this.getRingList();

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

    // <<<<<<<<<<<<<< Filter event handlers (START) >>>>>>>>>>>>>>
    shopFilterValChanged(event, value, reason)
    {
        const tempRingList = this.getRingList(undefined, value);
        
        // cannot use this.state to update filter's variables cause setState is async 
        // so need use (state) => {} will use previous state of the variable
        this.setState(state => ({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            filter: { 
                ...state.filter,
                shop: value,
            },
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
        }));
    }

    caratFilterValChanged(event, value, reason)
    {
        const tempRingList = this.getRingList(undefined, undefined, value);
        
        // cannot use this.state to update filter's variables cause setState is async 
        // so need use (state) => {} will use previous state of the variable
        this.setState((state, props) => ({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            filter: { 
                ...state.filter,
                carat: value,
            },
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
        }));
    }

    clarityFilterValChanged(event, value, reason)
    {
        const tempRingList = this.getRingList(undefined, undefined, undefined, value);
        
        // cannot use this.state to update filter's variables cause setState is async 
        // so need use (state) => {} will use previous state of the variable
        this.setState((state, props) => ({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            filter: { 
                ...state.filter,
                diamondClarity: value,
            },
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
        }));
    }

    colorFilterValChanged(event, value, reason)
    {
        const tempRingList = this.getRingList(undefined, undefined, undefined, undefined, value);
        
        // cannot use this.state to update filter's variables cause setState is async 
        // so need use (state) => {} will use previous state of the variable
        this.setState((state, props) => ({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            filter: { 
                ...state.filter,
                diamondColor: value,
            },
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
        }));
    }

    priceFilterValChanged(event, value, reason)
    {
        const tempRingList = this.getRingList(undefined, undefined, undefined, undefined, undefined, value);
        
        // cannot use this.state to update filter's variables cause setState is async 
        // so need use (state) => {} will use previous state of the variable
        this.setState((state, props) => ({
            currentPage: 1,
            displayRings: tempRingList.slice(0, 9),
            filter: { 
                ...state.filter,
                price: value,
            },
            numOfPages: Math.ceil(tempRingList.length/9),
            ringList: tempRingList,
        }));
    }
    // <<<<<<<<<<<<<< Filter event handlers (END) >>>>>>>>>>>>>>

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

    // <<<<<<<<<<<<<< search bar event handlers (START) >>>>>>>>>>>>>>
    searchValChanged(value)
    {
        // change url without reloading the page to remove /p?=:pageNum if user search something
        // when user is in another page instead of page 1
        window.history.pushState("", "DiaMiner", "/");

        // get list of rings based on what user typed on search bar to filter
        // pass in value instead of set to state.searchWord 1st for optimization
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
    // <<<<<<<<<<<<<< search bar event handlers (END) >>>>>>>>>>>>>>

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
                        handleShopFilterValue={this.shopFilterValChanged}
                        handleCaratFilterValue={this.caratFilterValChanged}
                        handleClarityFilterValue={this.clarityFilterValChanged}
                        handleColorFilterValue={this.colorFilterValChanged}
                        handlePriceFilterValue={this.priceFilterValChanged}
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
    // filtering/search is done here too
    getRingList(searchWord=this.state.searchWord, 
        shopFilter=this.state.filter.shop, 
        caratFilter=this.state.filter.carat, 
        clarityFilter=this.state.filter.diamondClarity, 
        colorFilter=this.state.filter.diamondColor, 
        priceFilter=this.state.filter.price)
    {
        var ringList = [];
        var filteredRingList = [];

        for (var key in this.state.diamondData)
        {
            var val = this.state.diamondData[key];

            for (var shop in val)
            {
                // check if shop filter is applied by the user
                if (shopFilter.length > 0)
                {
                    // if the shop is not in the filter, don't need get the shop's rings so continue loop
                    if (!shopFilter.includes(shop))
                        continue;
                }

                // get a list of ringsInfo and push them into ringList
                var tempRingList = this.state.diamondData[key][shop];
                ringList.push(...tempRingList);
            }
        }

        // check if user search content or add filter before apply filtering
        // more optimized to check 1st before letting it loop index by index
        if (searchWord !== "" || shopFilter.length > 0 || caratFilter.length > 0 || 
            clarityFilter.length > 0 || colorFilter.length > 0 || priceFilter.length > 0)
        {
            filteredRingList = ringList.filter(ring => {
                // check if user did input search ring name in search bar before filtering
                // by searchWord
                if (searchWord !== "")
                {
                    const ringName = ring.ringName.toLowerCase();
                    const filter = searchWord.toLowerCase();
                    
                    // check if it returns false, then no point check other filters
                    // since fail filtering already so just return false
                    if (!ringName.includes(filter))
                        return false;
                }

                // check if user include filters for ring diamond's carat
                if (caratFilter.length > 0)
                {
                    // check if it returns false, then no point check other filters
                    // since fail filtering already so just return false
                    if (!caratFilter.includes(ring.ringCarat))
                        return false;
                }

                // check if user include filters for ring diamond's clarity
                if (clarityFilter.length > 0)
                {
                    // check if it returns false, then no point check other filters
                    // since fail filtering already so just return false
                    if (!clarityFilter.includes(ring.ringDiaClarity))
                        return false;
                }

                // check if user include filters for ring diamond's color
                if (colorFilter.length > 0)
                {
                    // check if it returns false, then no point check other filters
                    // since fail filtering already so just return false
                    if (!colorFilter.includes(ring.ringDiaColor))
                        return false;
                }

                // check if user include filters for ring's price
                if (priceFilter.length > 0)
                {
                    const result = priceFilter.filter(price => {
                        // divide by 100 cause stored by * 100 to avoid floating-point arithmetic
                        const currentRingPrice = ring.ringPrice / 100;

                        // check if the price filter is it "less than" condition
                        if (price[0] === "<")
                        {
                            // extract the amount in integer from the filter then compare
                            // if the current ring's price is lesser than the filter's price
                            if (currentRingPrice < price.match(/\d+/)[0])
                                return true;
                            else
                                return false;
                        }
                        // check if the price filter is it "more than" condition
                        else if (price[0] === ">")
                        {
                            // extract the amount in integer from the filter then compare
                            // if the current ring's price is greater than the filter's price
                            if (currentRingPrice > price.match(/\d+/)[0])
                                return true;
                            else
                                return false;
                        }
                        else
                        {
                            // since filter is e.g. "$3000-$4000" so split to get each value
                            const priceList = price.split("-")
                            
                            // compare prices see if currently ring's price is inbetween
                            // the filter's price range
                            if (priceList[0].match(/\d+/)[0] <= currentRingPrice &&
                                currentRingPrice <= priceList[1].match(/\d+/)[0])
                                return true;
                            else
                                return false;
                        }
                    });

                    // means the current ring failed all the price filters
                    if (result.length === 0)
                        return false
                }
            
                // only need to return true here since if any ring not in filter would have
                // already returned false
                return true;
            });

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

// function component to create ring posts dynamically
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
