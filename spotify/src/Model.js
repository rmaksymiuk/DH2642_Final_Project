import axios from "axios";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import resolvePromise from "./resolvePromise.js"
import img2 from './components/Main/no image.jpeg';
import {getTopArtist_assist, getTopTrack_assist} from './utilities.js';

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const MAIN_ENDPOINT="https://api.spotify.com/v1/me";

const app = initializeApp(firebaseConfig);

export default class Model {
    constructor() {
        if(localStorage.getItem("accessToken")) {
            this.observers = [];
            this.setToken(localStorage.getItem("accessToken"));
            this.currentArtistPromiseState={};
            this.currentTrackPromiseState={};
            this.avgPopularity = 0;
            this.totalGenres = 0;
            this.setArtists();
            this.setTracks();
            this.setProfile(this.token);
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
        this.observers.forEach(invokeObserverCB);
    }

    setAvgPopularity(popularity) {
        this.avgPopularity = popularity;
        const payload = {"setAvgPopularity" : popularity};
    }

    setTotalGenres(genres) {
        this.totalGenres = genres;
        const payload = {"setTotalGenres" : genres};
    }


    setToken(token) {
        this.token = token;
        const payload = {"setToken" : token};
        this.notifyObservers(payload);
    }

    setArtists() {
        resolvePromise(getTopArtist_assist(0, this.token),this.currentArtistPromiseState, this.notifyObservers.bind(this));
    }

    setTracks() {
        resolvePromise(getTopTrack_assist(0, this.token),this.currentTrackPromiseState, this.notifyObservers.bind(this));
    }

    getArtists(){
        return this.currentArtistPromiseState.data;
    }

    getTracks(){
        return this.currentTrackPromiseState;
    }

    setProfile(token) {
        axios
          .get(MAIN_ENDPOINT, {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            },
          })
          .then((response) => {
            this.profile = response.data;
            this.profile.id = this.profile.id.replace('.','');
            this.profile.id = this.profile.id.replace('#','');
            this.profile.id = this.profile.id.replace('$','');
            this.profile.id = this.profile.id.replace('[','');
            this.profile.id = this.profile.id.replace(']','');
            if(this.profile.images[0]) {
                this.setUserData(this.profile.id, this.profile.display_name, this.profile?.images[0].url);
            } else {
                this.setUserData(this.profile.id, this.profile.display_name, img2);
            }
            this.userId = this.profile.id;
          })
          .catch((error) => {
            console.log(error);
          });
      };

    setUserData(userId, name, photoUrl) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId);
        set(reference, {
            id: userId,
            name: name,
            profileUrl: photoUrl
        }
    );

    }

}