import React, { Component } from 'react'

// @material-ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class RingPost extends Component {
    // using __html as the key to pass to dangerouslySetInnerHTML as an object to show it is sanitized
    getDiamondClarity()
    {
        return {__html: this.props.ringInfo.ringDiaClarity};
    }

    getDiamondColor()
    {
        return {__html: this.props.ringInfo.ringDiaColor};
    }

    getRingCarat()
    {
        return {__html: this.props.ringInfo.ringCarat};
    }

    getRingPrice()
    {
        if (this.props.ringInfo.ringPrice === 0)
            return {__html: "Out of stock"};
        else
            return {__html: ("$" + (this.props.ringInfo.ringPrice / 100).toFixed(2))};
    }

    getRingName()
    {
        return {__html: this.props.ringInfo.ringName};
    }

    render() {
        return (
            <div>
                <Card style={{maxWidth: 250}}>
                     <CardActionArea
                        href={this.props.ringInfo.ringSiteURL}
                        target="_blank"
                     >
                        <CardMedia
                            component="img"
                            alt="Ring Image"
                            className="cardMedia"
                            image={this.props.ringInfo.ringImage}
                            title="Ring Image"
                        />
                        <CardContent>
                            <Typography 
                                gutterBottom variant="button" 
                                color="primary" 
                                dangerouslySetInnerHTML={this.getRingName()}
                            />
                            <Typography 
                                variant="body2" 
                                color="textSecondary"
                            >
                                <Grid container>
                                    <Grid item xs={8}>Carat:</Grid>
                                    <Grid 
                                        item
                                        xs
                                        dangerouslySetInnerHTML={this.getRingCarat()}
                                    />
                                    <Grid item xs={8}>Diamond clarity:</Grid>
                                    <Grid 
                                        item
                                        xs
                                        dangerouslySetInnerHTML={this.getDiamondClarity()}
                                    />
                                    <Grid item xs={8}>Diamond color:</Grid>
                                    <Grid 
                                        item
                                        xs
                                        dangerouslySetInnerHTML={this.getDiamondColor()}
                                    />
                                    <Grid item xs={8}>Price:</Grid>
                                    <Grid 
                                        item
                                        xs
                                        dangerouslySetInnerHTML={this.getRingPrice()}
                                    />
                                </Grid>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                 </Card>
            </div>
        )
    }
}

export default RingPost
