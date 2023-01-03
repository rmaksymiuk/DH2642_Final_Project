import React, { useState, useEffect } from "react";
import './LogIn.css';
import LogInView from "./LogInView";
const CLIENT_ID = "f3249000e56a4740b15910bc9611b894";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/login";
const SCOPES = [
  "user-top-read", "ugc-image-upload", "user-read-playback-state", "user-read-currently-playing",
  "playlist-read-private", "playlist-read-collaborative", "user-follow-read", "user-read-playback-position",
  "user-read-recently-played", "user-library-read", "user-read-private", "user-read-email"
];
const PARAM=SCOPES.join("%20");

const splitCurrentHashCB = (hash) => {
  const hashstr = hash.substring(1);
  const params = hashstr.split("&");
  return params.reduce((accumul, curval) => {
    const [key, value] = curval.split("=");
    accumul[key] = value;
    return accumul;
  }, {});
};

export default function Login(){
  const [,reRender]= useState("");
  useEffect(() => {
    if (localStorage.getItem('accessToken')){
      window.location='/';
      return;
    }
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        splitCurrentHashCB(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      reRender();
    }
  });

function handleLoginACB() {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PARAM}&response_type=token&show_dialog=true`;
  };

function backACB(){
    window.location='/';
  }
  return (
      <LogInView back={backACB} handleLogin={handleLoginACB}/>
  );
};


