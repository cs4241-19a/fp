//Container for feed items, holds FeedItem comps in material ui Grid
import React from 'react';
import FeedItem from './FeedItem';
import Grid from '@material-ui/core/Grid';

export default function FeedContainer(props) {

    //get this from server somewhere else, maybe store?
    let items = [
        {
            song: {title: "title1", artist: "artist1", song_id: 0},
            user: {username: "uname1", name: "Bob"},
            options: {height: 0, length: 0},
            datetime: "20/02/2010"
        },
        {
            song: {title: "asdf", artist: "asdf", song_id: 0},
            user: {username: "-0q9[2 34", name: "Boq23sdfgb"},
            options: {height: 0, length: 0},
            datetime: "01/01/2012"
        },
        {
            song: {title: "title", artist: "artist", song_id: 0},
            user: {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
            options: {height: 0, length: 0},
            datetime: "01/02/2015"
        },
    ]

    fetch('/feed')
        .then( function( response ) {
            return response.json();
        }).then(function (response){
            response.forEach(feed_item => {
                items.push(feed_item)
            });
            return (
                <Grid container direction='column' justify='center' alignItems='center'>
                    {items.map(item => {
        
                        //TODO: Feed items not working, idk but div works
        
                        // <FeedItem
                        //     key={item.song.title} 
                        //     song={item.song}
                        //     user={item.user}
                        //     options={item.options}
                        // />
                        return <div key={item.song.title}>{item.user.username}</div>
                    })}
                </Grid>
            )
        });

    //when getting array of 10 items from server
    //items.map(item) => <FeedItem etcetcetc />
    //will render all feed items automatically from the data

    // song={song} user={user} options={options}

    //TODO: Each of the FeedItems in the generated list needs a unique 'key' field
    //Currently have it set to the song title but not guarantee this is unique
    
}