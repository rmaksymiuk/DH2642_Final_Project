import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getRecommendations_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function Recommendations(props){
    const [promiseState] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});

    if (!promiseState.data){
        props.model.setArtists();
        console.log(props.model);
        console.log(props.model.currentArtistPromiseState.data);
        console.log(props.model);
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