import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getRecommendations_assist} from '../../utilities.js';
import promiseNoData2 from '../../promiseNoData2';

export default function Recommendations(props){
    const [promiseState] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});

    useEffect(() => {
        if(props.model.currentTrackPromiseState.data && props.model.currentArtistPromiseState.data) {
            resolvePromise(getRecommendations_assist(props.model.token, props.model.currentArtistPromiseState.data, props.model.currentTrackPromiseState.data),promiseState, notifyACB);
        }
    }, []);

    function notifyACB(){
        reRender({});
    }

    return (
        <div>
            {promiseNoData2(props.model.currentArtistPromiseState, props.model.currentTrackPromiseState, promiseState)
            }
        </div>
    )
}