import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './store';
import FeedContainer from './FeedContainer'
import FeedItem from './FeedItem';

export default function App(props) {


    const song = {title: "asdf", artist: "asdf", file: 0},
          user = {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
          options  = {height: 0, length: 0};

    return (
        <div className="w-full">
            <FeedContainer className="w-full padder"/>
            <div className="lg:text-center bottomBanner w-full"> Designed and developed in Worcester, Massachusetts </div>
        </div>
    )

}