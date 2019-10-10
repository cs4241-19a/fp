import React from 'react';
import FeedContainer from "./FeedContainer";

export default function ProfileApp(props) {

    return (
        <React.Fragment>
            <FeedContainer />
            <div className="lg:text-center bottomBanner"> Designed and developed in Worcester, Massachusetts </div>
        </React.Fragment>
    )

}