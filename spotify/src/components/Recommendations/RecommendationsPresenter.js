import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";

export default function Recommendations(props){
    const [token, setToken]=React.useState(props.token);
    const [artists, setArtists] = useState();
    const [tracks, setTracks] = useState();
    const [data, setData] = useState({});


    function componentWasCreatedACB(){
          if (token) {
            setToken(localStorage.getItem("accessToken"));
            getRecommendationsACB(localStorage.getItem("accessToken"), props.artists, props.tracks);
          }
    }
    React.useEffect(componentWasCreatedACB, [] );


    async function getTopTrackACB(Token = token) {
        await Promise.all(

        )
          axios
            .get(TOPTRACK_ENDPOINT+"?limit=3", {
              headers: {
                "Authorization": "Bearer " + Token,
                "Content-Type": "application/json"
              },
            })
            .then((response) => {
              setTracks(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        };

    function getTopArtistACB(Token=token) {
      axios.get(TOPARTIST_ENDPOINT+"?limit=2", {
          headers: {
            "Authorization": "Bearer " + Token,
            "Content-Type": "application/json"
          },
        })
    };

    function getRecommendationsACB(Token = token, artists, tracks) {
        axios.get(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+artists[0]+","+artists[1]+"&seed_tracks="+tracks[0]+","+tracks[1]+","+tracks[2], {
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