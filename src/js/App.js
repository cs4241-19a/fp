import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
// import model from './store';
import FeedContainerAll from './FeedContainerAll'
import FeedItem from './FeedItem';

export default function App(props) {


    const song = {title: "asdf", artist: "asdf", file: 0},
          user = {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
          options  = {height: 0, length: 0};

    return (
        <React.Fragment>
            <FeedContainerAll />
            <div className="lg:text-center bottomBanner"> Designed and developed in Worcester, Massachusetts </div>
        </React.Fragment>
    )

}