import Model from "./Model.js";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function observerRecap(model) {
    model.addObserver(function paramACB(payload){console.log(payload);});
}

export function updateFirebaseFromModel(model) {
    function addFirebaseACB(payload) {
        if (!payload)
            return;
        if(payload.setAvgPopularity !== undefined) {
            if(model.profile.id) {
                console.log(model.profile.id);
                set(ref(db, "users/" + model.profile.id + "/avgPopularity"), model.profile.avgPopularity);
            }
       }
        if(payload.setTotalGenres !== undefined) {
            if(model.profile.id) {
                console.log(model.profile.id);
                set(ref(db, "users/" + model.profile.id + "/totalGenres"), model.profile.totalGenres);
            }
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}