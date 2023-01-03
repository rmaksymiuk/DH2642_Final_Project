const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const timeRange=["short_term", "medium_term", "long_term"];

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