//Container for feed items, holds FeedItem comps in material ui Grid
import React from 'react';
import FeedItem from './FeedItem';
import Grid from '@material-ui/core/Grid';

export default function FeedContainer(props) {

    //get this from server somewhere else, maybe store?
    let items = [{
        title: "yo",
        user: "yoyo"
    },
    {
        title: "noo",
        user: "nono"
    }]

    function getItems() {
        fetch( '/feed')
            .then( function( response ) {
                return response.json();
            }).then(function (response) {
            window.localStorage;
            let userN = localStorage.getItem('currUser');
            console.log(userN)
            for(let i = 0; i < response.length; i++) {
                if(response[i].user === userN) {
                    items.push(response[i])
                }
            }
        })


    }

    getItems()

    //when getting array of 10 items from server
    //items.map(item) => <FeedItem etcetcetc />
    //will render all feed items automatically from the data

    // song={song} user={user} options={options}

    //TODO: Each of the FeedItems in the generated list needs a unique 'key' field
    //Currently have it set to the song title but not guarantee this is unique
    
    return (
        <Grid container direction='column' justify='center' alignItems='center'>
            {items.map(item => {
                return (
                <div key={item.title + item.user}>
                    <FeedItem
                        key={item.title}
                        user={item.user}
                    />
                </div>
            )
            })}
        </Grid>
    )
}