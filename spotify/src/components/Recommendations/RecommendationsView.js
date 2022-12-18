import "./Recommendations.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@mui/material/styles';
import {Theme} from "../../Theme.js"

export default function RecommendationsView(props) {
    function findDetailsACB(track){
        return <div className="details" key={track.id}>
        <a target="_blank" href={track.external_urls.spotify}>
              <ListItem>
                <ListItemAvatar style={{display:'flex', justifyContent:'flex-end'}}>
                  <Avatar src = {track.album.images[2].url} />
                </ListItemAvatar>
                <ListItemText class = "ListItem" primary={track.name}/>
                <ListItemText class = "ListItem" primary={track.artists[0].name}/>
              </ListItem>
        </a>
            </div>
    };

    return (
      <>
        <ThemeProvider theme={Theme}>
        <h1 className="title">{"Recommendations"}</h1>
        <br/>
            <List sx={{maxWidth: 800, width: '100%', bgcolor: 'background.paper'}}>
                {props.data?.tracks?props.data.tracks.map((track)=>{return findDetailsACB(track)}):null}
            </List>
        </ThemeProvider>
      </>
    );
}