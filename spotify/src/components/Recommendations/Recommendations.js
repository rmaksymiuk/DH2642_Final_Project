import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recommendations.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";

export default function Recommendations(props){
    const [data, setData] = useState({});
    const [token, setToken] = useState("");
    useEffect(() => {
      const fetchData = async () => {
          if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
            getRecommendationsACB(localStorage.getItem("accessToken"), props.artists, props.tracks);
          }
      }
      fetchData();
    }, []);

    function getRecommendationsACB(Token = token, artists, tracks) {
        axios
            .get(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+artists[0]+","+artists[1]+"&seed_tracks="+tracks[0]+","+tracks[1]+","+tracks[2], {
                headers: {
                    "Authorization": "Bearer " + Token,
                    "Content-Type": "application/json"
                },
            })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    function findDetailsACB(track){
        return <div className="details" key={track.id}>
        <a target="_blank" href={track.external_urls.spotify}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src = {track.album.images[2].url} />
                </ListItemAvatar>
                <ListItemText primary={track.name} />
                <ListItemText primary={track.artists[0].name} />
              </ListItem>
        </a>
            </div>
    };
  
    return (
      <>
        <h1 className="title">{"Recommendations"}</h1>
        <br/>
        {data?.tracks?data.tracks.map((track)=>{return findDetailsACB(track)}):null}
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

    </List>
      </>
    );
  };
  