import React from 'react';
import { Paper, Typography, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default function FeedItem(props) {

    /* Props: 
     * song - {title: "foo", artist: "foo"}
     * user - {username: "foo", name: "foo"}
     * options - {height: 0, length: 0, file: 0}
     */

    async function handleClick() {
        console.log('paper has been clicked');

        //get song and play it for the vis
    }

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