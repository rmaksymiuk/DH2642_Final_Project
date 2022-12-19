import RecommendationsView from "../Recommendations/RecommendationsView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";

export default function Recommendations(props){
    const [data, setData] = useState({});
    const [,reRender]= useState("");

    function componentWasCreatedACB(){
          if (props.model.token && props.model.tracks && props.model.artists) {
            getRecommendationsACB(props.model.token, props.model.artists, props.model.tracks);
          }
          reRender({});
    }
    React.useEffect(componentWasCreatedACB, [] );

    function getRecommendationsACB(token, artists, tracks) {
        axios.get(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+artists[0].id+","+artists[1].id+"&seed_tracks="+tracks[0].id+","+tracks[1].id+","+tracks[2].id, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
            })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if(!props.model.tracks && !props.model.artists) {
		return <Box sx={{ display: 'flex' }}>
                     <CircularProgress />
                   </Box>;
    } else if(props.model.tracks.length < 3 || props.model.artists.length < 2) {
        return <div className="text">"You do not have sufficient play records"</div>;
    } else {
        return <RecommendationsView data = {data}/>;
    }
}