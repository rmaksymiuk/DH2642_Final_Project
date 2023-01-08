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
    const N1=artists.length>=2?2:artists.length;
    const N2=tracks.length>=3?3:tracks.length;
    let tadress1="";
    let tadress2="";
    
    for (let i=0;i<N1;i++){
        tadress1+=artists[i].id;
        if (i!==N1-1)
            tadress1+=",";
    }
    for (let i=0;i<N2;i++){
        tadress2+=tracks[i].id;
        if (i!==N2-1)
            tadress2+=",";
    }    
    return fetch(RECOMMENDATIONS_ENDPOINT+"?seed_artists="+tadress1+"&seed_tracks="+tadress2, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    .then((response) => {
        return response.json();
    })
};