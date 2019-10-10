//Container for feed items, holds FeedItem comps in material ui Grid
import React, { useState, useEffect } from 'react';
import FeedItem from './FeedItem';
import Grid from '@material-ui/core/Grid';

export default function FeedContainer(props) {

    //get this from server somewhere else, maybe store?

    // function getItems() {

    //     let list = []

    //     fetch( '/feed')
    //         .then( function( response ) {
    //             return response.json();
    //         }).then(function (response) {
    //         window.localStorage;
    //         let userN = localStorage.getItem('currUser');
    //         console.log(userN)
    //         for(let i = 0; i < response.length; i++) {
    //             if(response[i].user === userN) {
    //                 list.push(response[i])
    //             }
    //         }
    //     })

    //     return list
    // }

    const [data, setData] = useState( { items: [] });

    useEffect(() => {
        
        async function getItems() {

            console.log('abc')
            let list = []

            await fetch( '/feed')
                .then( function( response ) {
                    return response.json();
                }).then(function (response) {
                window.localStorage;
                let userN = localStorage.getItem('currUser');
                console.log(userN)
                for(let i = 0; i < response.length; i++) {
                    if(response[i].user === userN) {
                        list.push(response[i])
                    }
                }
            })
            console.log(list)
            setData(list);
        }
        // getItems()
    })

    // console.log(data)


    // useEffect( () => {
    //     console.log("YYYYYYYYYYYYYYYYYY")
    //     console.log(items)
    //     getItems();
    // })

    //when getting array of 10 items from server
    //items.map(item) => <FeedItem etcetcetc />
    //will render all feed items automatically from the data

    // song={song} user={user} options={options}

    //TODO: Each of the FeedItems in the generated list needs a unique 'key' field
    //Currently have it set to the song title but not guarantee this is unique

    return (
        <Grid container direction='column' justify='center' alignItems='center'>

            {/*{ () => {
                // setItems(getItes())

                items.map(item => {
                    return (
                        <div key={item.title + item.user}>
                            <FeedItem
                                key={item.title}
                                user={item.user}
                                title={item.title}
                            />
                        </div>
                    )
                })}}*/}



            {/*{data.map(item => {
                return (
                    <div key={item.title + item.user}>
                        <FeedItem
                            key={item.title}
                            user={item.user}
                            title={item.title}
                        />
                    </div>
                )
            })}*/}
        </Grid>
    )

}