import Model from "./Model.js";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const referencePop = ref(db, "/avgPopularity");
const referenceGen = ref(db, "/totalGenres");

export function observerRecap(model) {
    model.addObserver(function paramACB(payload){console.log(payload);});
}

export function updateFirebaseFromModel(model) {
    function addFirebaseACB(payload) {
        if (!payload)
            return;
        if(payload.setAvgPopularity !== undefined) {
            set(referencePop, model.avgPopularity);
       }
        if(payload.setTotalGenres !== undefined) {
            set(referenceGen, model.totalGenres);
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}


