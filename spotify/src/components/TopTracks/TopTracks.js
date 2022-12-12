import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopTracks.css"

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const timeFrame =  ["short_term", "medium_term", "long_term"];
const pageName = ["4 weeks", "6 months", "all time"];

export default function TopTrack(){
    const [token, setToken] = useState("");
    const [data, setData] = useState();
    const [page, setPage] = useState(0);
  
    useEffect(() => {

      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));

      }
  
    }, []);
  
    function getTopTrack(pg) {
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

    function pageChangeACB(pg){
      setPage(pg);
      getTopTrack(pg);
    }
    return (
      <>
        {token && getTopTrack()}

        <div className="container">
          <h1 className="title">{"Top Tracks ("+pageName[page]+")"}</h1>
          <div className="menu">
              <ul className="tabs">
                <li>{pageName[0]}</li>
                <li>{pageName[1]}</li>
                <li>{pageName[2]}</li>
              </ul>
          </div>
        </div>
        {/* <h1>Top {data.limit} Songs</h1> */}
        {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      </>
    );
  };
  