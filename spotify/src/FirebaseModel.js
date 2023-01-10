import Model from "./Model.js";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

firebase.initializeApp(firebaseConfig);
const REF="Model";

export function observerRecap(model) {
    model.addObserver(function paramACB(payload){console.log(payload);});
}

export function updateFirebaseFromModel(model) {
    function addFirebaseACB(payload) {
        if (!payload)
            return;
        if(payload.setAvgPopularity !== undefined) {
            firebase.database().ref(REF+"/avgPopularity").set(model.avgPopularity);
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}


