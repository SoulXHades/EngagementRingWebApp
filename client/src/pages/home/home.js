import React, { Component } from 'react';
import axios from 'axios';

// @material-ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class Home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            diamondData: null,
        };
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

    render() 
    {
        return (
            <div className="center">
                <div className="containerSearch">
                    <Autocomplete // for Search bar for ring names
                        id="searchRings"
                        // creating an Array of ring names from the JSON object using map(),
                        // convert to Set to to remove duplicated ring names, and convert back to Array.
                        options={Array.from(new Set(this.getRingList().map((option) => option.ringName)))}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search ring names..."
                            margin="dense"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                    />
                </div>
                <div className="containerRings">
                    <Grid container spacing={1}>
                        <Grid item xs={15} sm={5}>
                            <Card style={{maxWidth: 350}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="template"
                                        className="cardMedia"
                                        image="https://firebasestorage.googleapis.com/v0/b/hawkercentral.appspot.com/o/images%2F1589555037633_fruits-cup.jpg?alt=media&token=84974e73-eb88-4e47-971d-b15e463b1751"
                                        title="Template"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Template
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Template Template
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={15} sm={5}>
                            <Card style={{maxWidth: 350}}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Template
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Template Template
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
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

export default Home
