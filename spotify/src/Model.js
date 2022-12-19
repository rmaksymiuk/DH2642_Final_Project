import axios from "axios";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from "firebase/database";

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const MAIN_ENDPOINT="https://api.spotify.com/v1/me";
const REF = "https://trackify-f0bb2-default-rtdb.europe-west1.firebasedatabase.app/"

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

export default class Model {
    constructor() {
        if(localStorage.getItem("accessToken")) {
            this.setToken(localStorage.getItem("accessToken"));
            this.setArtists();
            this.setTracks();
            this.observers = [];
            this.writeUserData();
        }
    }

    addObserver(callback){
        this.observers = [...this.observers, callback];
        
    }

    removeObserver(callbackToRemove){
        function isNotSameCallbackCB(callback){
            return (callback !== callbackToRemove);
        }
        this.observers = this.observers.filter(isNotSameCallbackCB);
    }

    notifyObservers(payload){
        function invokeObserverCB(obs){ 
            try{
                obs(payload)
            } catch(err){
                console.error(err); 
            }  
        }
        if (this.observers) this.observers.forEach(invokeObserverCB);
    }



    getArtists()
    {
        return this.artists;
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
        console.log("writing user data");
    }


}