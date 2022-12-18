import TopTracksView from "../TopTracks/TopTracksView.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const timeFrame =  ["short_term", "medium_term", "long_term"];

export default function TopTracks(props){
    const [data, setData] = useState();

    useEffect(() => {

      if (props.model.token) {
        getTopTrack(0, props.model.token);
      }

    }, []);

    function getTopTrack(pg, token) {
      axios
        .get(TOPTRACK_ENDPOINT+"?time_range="+timeFrame[pg], {
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

    return <TopTracksView data = {data} getTopTrack = {getTopTrack}/>;
}