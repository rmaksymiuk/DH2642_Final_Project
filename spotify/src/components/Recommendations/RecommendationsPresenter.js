import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getRecommendations_assist} from '../../utilities.js';
import promiseNoData2 from '../../promiseNoData2';

export default function Recommendations(props){
    const [resi] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});

    useEffect(() => {

       }, []);

    function getRecommendationsACB(token, artists, tracks) {
        getRecommendations_assist(token, artists, tracks);
    }

    function artistsToIDACB(artist) {
        return artist.id
    }

    function tracksToIDACB(track) {
        return track.id
    }

    return (
        <div>
            {promiseNoData2(props.model.currentArtistPromiseState, props.model.currentTrackPromiseState)
            ||<RecommendationsView token={props.model.token} artists = {props.model.currentArtistPromiseState.data.map(artistsToIDACB)}
                tracks = {props.model.currentTrackPromiseState.data.map(tracksToIDACB)}/>}
        </div>
    )
}