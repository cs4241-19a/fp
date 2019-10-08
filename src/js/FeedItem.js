import React from 'react';
import { Paper, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    const song = useStoreState(state => state.vis.song);
    const user = useStoreState(state => state.vis.user);
    const setSong = useStoreActions(actions => actions.vis.setSong);

    // function handleClick() {
    //     const payload = {
    //         song: props.song,
    //         user: props.user,
    //         options: props.options
    //     }
    //     setVis(vis, payload);
    // }

    // return (
    //     <div>
    //         <h4>{JSON.stringify(song)}</h4>
    //         {/* <h4>{JSON.stringify(vis.user)}</h4>
    //         <h4>{JSON.stringify(vis.options)}</h4> */}
    //         <button onClick={e => {
    //             // console.log("32")
    //             e.preventDefault;
    //             console.log('@32: ', props.song)
    //             setSong(song, props.song)
    //             // console.log('39')
    //             console.log('@34: ', song)
    //         }
    //         }>Update</button>
    //     </div>
    // )

    const useStyles = makeStyles({
        paper: {
            padding: '10px 10px',
            borderRadius: '15px'
        },
        avatar: {
            margin: 10,
            backgroundColor: '#141115'
        }
    })

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>

                <Typography variant="h5">
                    Song - Artist
                </Typography>
                <Typography component="p">
                    Uploaded by {user.name}
                </Typography>
                <Avatar className={classes.avatar}>N</Avatar>
            </Paper>
        </div>
    )

}