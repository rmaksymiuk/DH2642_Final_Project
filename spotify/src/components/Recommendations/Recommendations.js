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
      const fetchData = async () => {
          if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
            await getUserArtistsACB(localStorage.getItem("accessToken"));
            await getUserTracksACB(localStorage.getItem("accessToken"));
            await getRecommendationsACB(localStorage.getItem("accessToken"));
          }
      }
      fetchData();
    }, []);

    function getUserArtistsACB(Token = token) {
        axios
            .get(TOPARTIST_ENDPOINT, { params: {limit: 2},
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                setTwoArtists(response.data.items.map(getIDCB));
                })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getUserTracksACB(Token = token) {
        axios
            .get(TOPTRACK_ENDPOINT, { params: {limit: 3},
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
            .then((response) => {
                setThreeTracks(response.data.items.map(getIDCB));
                })
            .catch((error) => {
                console.log(error);
            });
    }

    function getIDCB(element) {
        return element.id;
    }

    function getRecommendationsACB(Token = token) {
        axios
            .get(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+twoArtists[0]+","+twoArtists[1]+"&seed_tracks="+threeTracks[0]+","+threeTracks[1]+","+threeTracks[2], {
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


    function findDetailsACB(track){
        return <div className="details" key={track.id}>
            <a target="_blank" href={track.external_urls.spotify}><img className="albumImg" src={track.album.images[1].url}/></a>
            <em>{track.name}</em>
            </div>
    };
  
    return (
      <>
        <h1 className="title">{"Recommendations"}</h1>
        <br/>
        {data?.tracks?data.tracks.map((track)=>{return findDetailsACB(track)}):null}
      </>
    );
  };
  