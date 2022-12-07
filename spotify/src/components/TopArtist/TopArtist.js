import React, { useEffect, useState } from "react";
import axios from "axios";

const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";

export default function TopArtist(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    function getTopArtist() {
      axios
        .get(TOPARTIST_ENDPOINT, {
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
        <button onClick={getTopArtist}>Get Top Artist</button>
        <br/>
        {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      </>
    );
  };
  