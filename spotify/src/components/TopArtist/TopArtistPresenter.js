import TopArtistView from "../TopArtist/TopArtistView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const timeRange=["short_term", "medium_term", "long_term"];

export default function TopArtist(props) {
    const [data, setData] = useState({});

    useEffect(() => {
         if (props.model.token) {
           getTopArtist(0, props.model.token);
         };
       }, []);

    function getTopArtist(idx, token) {
        axios.get(TOPARTIST_ENDPOINT+"?time_range="+timeRange[idx]+"&limit=20", {
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

    return <TopArtistView data = {data} getTopArtist = {getTopArtist} token = {props.model.token}/>;
}