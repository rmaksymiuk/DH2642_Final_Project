import React, { useEffect, useState } from "react";
import axios from "axios";

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";

export default function TopTrack(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    function getTopTrack() {
      axios
        .get(TOPTRACK_ENDPOINT, {
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
        {getTopTrack()}
        <br/>
        <h1>Top {data.length} Songs</h1>
        {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      </>
    );
  };
  