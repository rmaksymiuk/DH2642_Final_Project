import React, { useEffect, useState } from "react";
import axios from "axios";

const TOPGENRES_ENDPOINT="https://api.spotify.com/v1/recommendations";

export default function TopGenres(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [topTracks, setTopTracks] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    function getTopGenres() {
      axios
        .get(TOPGENRES_ENDPOINT, { params: { seed_artists: "4NHQUGzhtTLFvgF5SZesLK", seed_genres: "pop,rap,country", seed_tracks: "6rqhFgbbKwnb9MLmUQDhG6"} }, {
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
  
    return (
      <>
        <button onClick={getTopGenres}>Get Top Genres</button>
        <br/>
        {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      </>
    );
  };
  