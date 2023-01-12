import Model from "./Model.js";
import { firebaseConfig } from "./FirebaseConfig.js";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, onValue, value, get, onChildAdded } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function observerRecap(model) {
    model.addObserver(function paramACB(payload){console.log(payload);});
}

export function updateFirebaseFromModel(model) {
    function addFirebaseACB(payload) {
    console.log(model);
        if (!payload)
            return;
        if(payload.setAvgPopularity !== undefined) {
            if(model.profile.id) {
                set(ref(db, "users/" + model.profile.id + "/avgPopularity"), model.profile.avgPopularity);
            }
       }
       if(payload.setTotalGenres !== undefined) {
            if(model.profile.id) {
                set(ref(db, "users/" + model.profile.id + "/totalGenres"), model.profile.totalGenres);
            }
       }
       if(payload.setTotalPopularity !== undefined) {
           if(model.totalUserAvgPop) {
               set(ref(db, "totalUserPopularities"), model.totalUserAvgPop);
           }
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}

export function updateModelFromFirebase(model) {
    onValue(ref(db, "totalUserPopularities"),
        (snapshot) => {
            model.totalUserAvgPop = snapshot.val();
        }
    );

    onChildAdded(ref(db, "users/"),
       (snapshot) => {
         onValue(ref(db, "users/" + snapshot.val().id + "/avgPopularity"),
         (snapshot2) => {
            if(snapshot2.val() != null)
                model.totalUserAvgPop += snapshot2.val();
                model.setTotalPopularity(model.totalUserAvgPop);
         })
       }, (errorObject) => {
         console.log('The read failed: ' + errorObject.name);
       }
    );

    return;
}