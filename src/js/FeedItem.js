import React from 'react';
import { Paper, Typography, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    const song = useStoreState(state => state.vis.song);
    const songFile = useStoreState(state => state.vis.songFile);
    const user = useStoreState(state => state.vis.user);
    const options = useStoreState(state => state.vis.options);

    const setSong = useStoreActions(actions => actions.vis.setSong);
    const setSongFile = useStoreActions(actions => actions.vis.setSongFile);
    const setUser = useStoreActions(actions => actions.vis.setUser);
    const setOptions = useStoreActions(actions => actions.vis.setOptions);

    async function handleClick() {
        console.log('paper has been clicked');

        //first fetch new song
        await setSongFile(songFile, props.song.song_id);

        //then give new options
        setSong(song, props.song);
        setUser(user, props.user);
        setOptions(options, props.options);

    }

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


    /*
     * Styles - 
     *  - Optimally, I'd like to have the 'view' btn be circular and maybe diff color
     *  - View btn is aligned to left side of paper, and avatar to right
     *  - Title of song is a good font and color. It would be nice to have the dash
     *      and the artist a slightly lighter shade of gray
     *  - The avatar can be the image for a user profile (we would need to add profile imgs
     *      to the database) or maybe some rng color
     *  - Uploaded by could be a lighter color, aybe italic? and indented
     * 
     *  -------------------------------------------------------------
     *  |                                                            |
     *  |        Title - Artist                                      |
     *  |  oo                                                    oo  |
     *  | oooo                                                  oooo |
     *  |  oo                                                    oo  |
     *  |               uploaded by username                         |
     *  |                                                            |
     *  -------------------------------------------------------------
     * 
     * 
     * 
     */
    const useStyles = makeStyles({
        container: {
            
        },
        paper: {
            display: 'flex',
            flexDirection: 'row',
            padding: '15px 15px',
            borderRadius: '15px',
            cursor: 'pointer',
            margin: '10px'
        },
        avatar: {
            margin: 10,
            backgroundColor: '#141115'
        },
        button: {
            // margin: '1'
        }
    })

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper className={classes.paper} onClick={handleClick}>
                {/* <Button
                    variant="contained"
                    className={classes.button}
                    color="primary">
                        View
                </Button> */}
                <div>
                    <Typography variant="h5">
                        {props.song.title} - {props.song.artist}
                    </Typography>
                    <Typography component="p">
                        Uploaded by {props.user.username}
                    </Typography>
                </div>
                <Avatar className={classes.avatar}>N</Avatar>
            </Paper>
        </div>
    )

}