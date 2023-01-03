import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getRecommendations_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function Recommendations(props){
    const [data, setData] = useState({});
    const [resi] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});


    useEffect(() => {
         if (props.model.token) {
            resolvePromise(getRecommendations_assist(props.model.token, props.model.artists, props.model.tracks),resi, notifyACB);
        };
       }, []);

    function notifyACB(){
        reRender({});
    }

    function getRecommendationsACB(token, artists, tracks) {
        resolvePromise(getRecommendations_assist(token, artists, tracks),resi, notifyACB);
    }

    return (
        <div>
            {promiseNoData(resi.promise, resi.data, resi.error)
            ||<RecommendationsView data={resi.data} token={props.model.token}
                getRecommendations={getRecommendationsACB}/>}
        </div>
    )
}