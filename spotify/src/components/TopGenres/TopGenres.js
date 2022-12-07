import React, { useEffect, useState } from "react";
import axios from "axios";

const TOPGENRES_ENDPOINT="https://api.spotify.com/v1/recommendations/available-genre-seeds";

export default function TopGenres(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    function getTopGenres() {
      axios
        .get(TOPGENRES_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + token,
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
  