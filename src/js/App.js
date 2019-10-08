import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './store';
import FeedItem from './FeedItem'

export default function App(props) {

    const store = createStore(model);

    const song = {title: "asdf", artist: "asdf", file: 0},
          user = {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
          options  = {height: 0, length: 0};
          

    //when getting array of 10 items from server
    //items.map(item) => <FeedItem etcetcetc />
    //will render all feed items automatically from the data

    return (
        <StoreProvider store={store}>
            <FeedItem song={song} user={user} options={options}/>
        </StoreProvider>
    )

}