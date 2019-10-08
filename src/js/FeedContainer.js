//Container for feed items, holds FeedItem comps in material ui Grid
import React from 'react';
import FeedItem from './FeedItem';
import Grid from '@material-ui/core/Grid';

export default function FeedContainer(props) {

    //get this from server somewhere else, maybe store?
    const items = [
        {
            song: {title: "title1", artist: "artist1", file: 0},
            user: {username: "uname1", name: "Bob"},
            options: {height: 0, length: 0},
        },
        {
            song: {title: "asdf", artist: "asdf", file: 0},
            user: {username: "-0q9[2 34", name: "Boq23sdfgb"},
            options: {height: 0, length: 0},
        },
        {
            song: {title: "title", artist: "artist", file: 0},
            user: {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
            options: {height: 0, length: 0},
        },
    ]

        //when getting array of 10 items from server
    //items.map(item) => <FeedItem etcetcetc />
    //will render all feed items automatically from the data

    // song={song} user={user} options={options}

    //TODO: Each of the FeedItems in the generated list needs a unique 'key' field
    //Currently have it set to the song title but not guarantee this is unique
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
}