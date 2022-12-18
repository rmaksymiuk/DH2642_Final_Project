const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
class Model {
    constructor() {
        this.token = setToken();
    }

    setToken() {
        this.token = localStorage.getItem("accessToken");
    }

}