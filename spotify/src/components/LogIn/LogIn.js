import React, { useEffect } from "react";
const CLIENT_ID = "acb0d4e1978245188e48efd073036e0c";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "https://trackify-fe471.web.app";
//Please change this URL part to https://localhost:3000 when you run it in your local server
const SCOPES = [
  "user-top-read", "ugc-image-upload", "user-read-playback-state", "user-read-currently-playing",
  "playlist-read-private", "playlist-read-collaborative", "user-follow-read", "user-read-playback-position",
  "user-read-recently-played", "user-library-read", "user-read-private", "user-read-email"
  //we need to add here what is needed to fetch api (refer to scopes section in Spotify Developer)
];
const PARAM = SCOPES.join("%20");

const splitCurrentHash = (hash) => {
  const hashstr = hash.substring(1);
  const params = hashstr.split("&");
  return params.reduce((accumul, curval) => {
    const [key, value] = curval.split("=");
    accumul[key] = value;
    return accumul;
  }, {});
};

export default function Login(){
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        splitCurrentHash(window.location.hash);

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <h1>Sign In</h1>
      <br/>
      <button onClick={handleLogin}>SignIn with spotify</button>
    </div>
  );
};
