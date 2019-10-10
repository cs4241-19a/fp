import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
// import model from './store';
import FeedContainer from './FeedContainer'
import FeedItem from './FeedItem';

export default function App(props) {

    window.localStorage;
    window.onload = function () {
    }

    return (
        <React.Fragment>
            <FeedContainer />
            <div className="lg:text-center bottomBanner"> Designed and developed in Worcester, Massachusetts </div>
        </React.Fragment>
    )

}