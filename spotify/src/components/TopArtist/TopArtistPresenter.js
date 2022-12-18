import TopArtistView from "../TopArtist/TopArtistView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const timeRange=["short_term", "medium_term", "long_term"];

export default function TopArtist(props) {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
         if (localStorage.getItem("accessToken")) {
           setToken(localStorage.getItem("accessToken"));
           getTopArtist(0, localStorage.getItem("accessToken"));
         };
       }, []);

    function getTopArtist(idx, Token=token) {
        axios.get(TOPARTIST_ENDPOINT+"?time_range="+timeRange[idx]+"&limit=20", {
            headers: {
                "Authorization": "Bearer " + Token,
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

    return <TopArtistView data = {data} getTopArtist = {getTopArtist}/>;
}