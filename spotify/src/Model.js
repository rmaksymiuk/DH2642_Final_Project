import axios from "axios";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";

export default class Model {
    constructor() {
        this.setToken(localStorage.getItem("accessToken"));
        this.setArtists();
        this.setTracks();
    }

    setToken(token) {
        this.token = token;
    }

    setArtists() {
        axios.get(TOPARTIST_ENDPOINT+"?limit=20", {
            headers: {
                "Authorization": "Bearer " + this.token,
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            this.artists = response.data.items;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setTracks() {
        axios.get(TOPTRACK_ENDPOINT+"?limit=20", {
            headers: {
                "Authorization": "Bearer " + this.token,
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            this.tracks = response.data.items;
        })
        .catch((error) => {
            console.log(error);
        });
    }
}