import "./Recommendations.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./Recommendations.css"
import Typography from '@mui/material/Typography';
import {getRecommendations_assist} from '../../utilities.js';
import { ThemeProvider, createTheme } from '@mui/system';
import React, { useEffect, useState } from "react";

export default function RecommendationsView(props) {
    function findDetailsACB(track){
        return <div className="details" key={track.id}>
        <a target="_blank" style= {{textDecoration:'none'}} href={track.external_urls.spotify}>
              <ListItem divider>
                <div className = "avatar">
                    <ListItemAvatar>
                      <Avatar src = {track.album.images[1].url} sx={{ height: 100, width: 100 }}/>
                    </ListItemAvatar>
                </div>
                <div className = "songName">
                    <ListItemText disableTypography primary={<Typography type="body2" style={{ fontSize: 30}}>{track.name}</Typography>}/>
                </div>
                <div className = "trackArtist">
                    <ListItemText className = "ListItem" primary={<Typography type="body2" style={{ fontSize: 20}}>{track.artists[0].name}</Typography>}/>
                </div>
              </ListItem>
        </a>
            </div>
    };

    return (
      <>
        <h1 className="title">{"Your Recommendations"}</h1>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h2>Start exploring these new tracks based on your current favorites</h2>
        </div>
        <br></br>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <List sx={{maxWidth: 800, width: '100%', }}>
                {props.data?.tracks?props.data.tracks.map((track)=>{return findDetailsACB(track)}):null}
            </List>
        </div>
      </>
    );
}