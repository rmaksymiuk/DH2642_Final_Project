import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";

export default function Recommendations(props){
    const [token, setToken]=React.useState(props.token);
    const [artists, setArtists] = useState(props.artists);
    const [tracks, setTracks] = useState(props.tracks);
    const [data, setData] = useState({});

    function componentWasCreatedACB(){
          if (token) {
            setToken(localStorage.getItem("accessToken"));
            getRecommendationsACB(localStorage.getItem("accessToken"), props.artists, props.tracks);
          }
    }
    React.useEffect(componentWasCreatedACB, [] );

    function getRecommendationsACB(Token = token, artists, tracks) {
        axios
            .get(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+artists[0]+","+artists[1]+"&seed_tracks="+tracks[0]+","+tracks[1]+","+tracks[2], {
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return <RecommendationsView data = {data}/>;
}