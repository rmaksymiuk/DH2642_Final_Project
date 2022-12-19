import axios from "axios";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const MAIN_ENDPOINT="https://api.spotify.com/v1/me";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default class Model {
    constructor() {
        if(localStorage.getItem("accessToken")) {
            this.setToken(localStorage.getItem("accessToken"));
            this.setArtists();
            this.setTracks();
            this.writeUserData();
        }
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

    writeUserData() {

    }


}