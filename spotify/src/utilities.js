const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const timeRange=["short_term", "medium_term", "long_term"];
const RECOMMENDATIONS_ENDPOINT="https://api.spotify.com/v1/recommendations";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";

export function getTopArtist_assist(idx, token) {
    return fetch(TOPARTIST_ENDPOINT+"?time_range="+timeRange[idx]+"&limit=20", {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    .then((response) => {  
        return response.json();
    })
    .then((result)=>(result.items))
};

export function getTopTrack_assist(idx, token) {
    return fetch(TOPTRACK_ENDPOINT+"?time_range="+timeRange[idx], {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    .then((response) => {
        return response.json();
    })
    .then((result)=>(result.items))
};

export function getRecommendations_assist(token, artists, tracks) {
    console.log("recommending");
    return fetch(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+artists[0].id+","+artists[1].id+"&seed_tracks="+tracks[0].id+","+tracks[1].id+","+tracks[2].id, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    .then((response) => {
        return response.json();
    })
};