import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recommendations.css"

const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";

export default function TopGenres(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [threeTracks, setThreeTracks] = useState({});
    const [twoArtists, setTwoArtists] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        getUserData(localStorage.getItem("accessToken"));
        getRecommendations(localStorage.getItem("accessToken"));
      }
    }, []);

    function getUserData(Token = token) {
        axios
            .get(TOPARTIST_ENDPOINT, { params: {limit: 2},
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                console.log(response.data.items);
                setTwoArtists(response.data.items);
                })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(TOPTRACK_ENDPOINT, { params: {limit: 3},
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                setThreeTracks(response.data);
                })
            .catch((error) => {
                console.log(error);
            });


    }
    function getRecommendations(Token = token) {
        axios
            .get(RECOMMENDATIONS_ENDPOINT, { params: { seed_artists: ["4NHQUGzhtTLFvgF5SZesLK", "06HL4z0CvFAxyc27GXpf02"], seed_tracks: "0c6xIDDpzE81m2q797ordA"},
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

    function findDetails(track){
        return <div className="details" key={track.id}>
            <a target="_blank" href={track.external_urls.spotify}><img className="albumImg" src={track.album.images[1].url}/></a>
            <em>{track.name}</em>
            </div>
    };
  
    return (
      <>
        <h1 className="title">{"Recommendations"}</h1>
        <br/>
        {data?.tracks?data.tracks.map((track)=>{return findDetails(track)}):null}
      </>
    );
  };
  