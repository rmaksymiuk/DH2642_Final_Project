import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getRecommendations_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function Recommendations(props){
    const [promiseState] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});
    const [artists, setArtists]=React.useState(props.model.currentArtistPromiseState.data);
    const [tracks, setTracks]=React.useState(props.model.currentTrackPromiseState.data);

    
    React.useEffect(wasCreatedACB, []);

    if (!promiseState.promise&&artists&&tracks)
        resolvePromise(getRecommendations_assist(props.model.token, artists, tracks),promiseState, notifyACB);
    
    function observerACB(){
        setArtists(props.model.currentArtistPromiseState.data);
        setTracks(props.model.currentTrackPromiseState.data);
        if (artists && tracks) {
            resolvePromise(getRecommendations_assist(props.model.token, artists, tracks),promiseState, notifyACB);
        };
    }

    function wasCreatedACB(){
        props.model.addObserver(observerACB);
         if (artists && tracks) {
            resolvePromise(getRecommendations_assist(props.model.token, artists, tracks),promiseState, notifyACB);
        };
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB);
        };
    }

    function notifyACB(){
        reRender({});
    }

    return (
        <div>
             {promiseNoData(promiseState.promise, promiseState.data, promiseState.error)
            ||<RecommendationsView data={promiseState.data} token={props.model.token}
                />}
        </div>
    )
}