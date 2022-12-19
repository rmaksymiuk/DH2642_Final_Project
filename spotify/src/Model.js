import axios from "axios";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const MAIN_ENDPOINT="https://api.spotify.com/v1/me";
const REF = "https://trackify-f0bb2-default-rtdb.europe-west1.firebasedatabase.app/"

const app = initializeApp(firebaseConfig);

export default class Model {
    constructor() {
        if(localStorage.getItem("accessToken")) {
            this.setToken(localStorage.getItem("accessToken"));
            this.setArtists();
            this.setTracks();
            this.setProfile();
            this.observers = [];
        }
        if(this.profile) {
            this.writeUserData(this.profile.id, this.profile.display_name, this.profile.images[0].url);
            console.log("wrote user data");
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

    setProfile() {
        axios
          .get(MAIN_ENDPOINT, {
            headers: {
              "Authorization": "Bearer " + this.token,
              "Content-Type": "application/json"
            },
          })
          .then((response) => {
            this.profile = response.data;
            this.profile.id = this.profile.id.replace('.','');
            this.writeUserData(this.profile.id, this.profile.display_name, this.profile.images[0].url);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    writeUserData(userId, name, photoUrl) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId);
        set(reference, {
            id: userId,
            name: name,
            profileUrl: photoUrl
        });
    }


}