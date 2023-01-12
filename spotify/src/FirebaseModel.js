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
        if (!payload)
            return;
        if(payload.setAvgPopularity !== undefined) {
            if(model.profile.id) {
                set(ref(db, "/avgPopularity"), model.profile.avgPopularity);
            }
       }
       if(payload.setTotalGenres !== undefined) {
            if(model.profile.id) {
                set(ref(db, "/totalGenres"), model.profile.totalGenres);
            }
       }
       if(payload.setToken !== undefined) {
            if(model.token) {
                set(ref(db, "/token"), model.token);
            }
       }
       if(payload.setTotalPopularity !== undefined) {
           if(model.totalUserPopularities) {
               set(ref(db, "totalUserPopularities"), model.totalUserPopularities);
           }
       }
       if(payload.setTotalUserGenres !== undefined) {
           if(model.totalUserGenres) {
               set(ref(db, "totalUserGenres"), model.totalUserGenres);
           }
       }
       if(payload.setTotalUsers !== undefined) {
          if(model.totalUsers) {
                set(ref(db, "totalUsers"), model.totalUsers);
          }
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}

export function updateModelFromFirebase(model) {
    onValue(ref(db, "totalUserPopularities"),
        (snapshot) => {
            model.totalUserPopularities = snapshot.val();
        }
    );

    onValue(ref(db, "totalUserGenres"),
        (snapshot) => {
            model.totalUserGenres = snapshot.val();
        }
    );

    onValue(ref(db, "totalUsers"),
        (snapshot) => {
            model.totalUsers = snapshot.val();
        }
    );

    onChildAdded(ref(db, "users/"),
       (snapshot) => {
         onValue(ref(db, "/avgPopularity"),
         (snapshot2) => {
            if(snapshot2.val() != null) {
                model.totalUserPopularities += snapshot2.val();
                model.setTotalPopularity(model.totalUserPopularities);
            }
            model.totalUsers = model.totalUsers + 1;
            model.setTotalUsers(model.totalUsers);
         })
       }, (errorObject) => {
         console.log('The read failed: ' + errorObject.name);
       }
    );

    onChildAdded(ref(db, "users/"),
       (snapshot) => {
         onValue(ref(db, "/totalGenres"),
         (snapshot2) => {
            if(snapshot2.val() != null)
                model.totalUserGenres += snapshot2.val();
                model.setTotalUserGenres(model.totalUserGenres);
         })
       }, (errorObject) => {
         console.log('The read failed: ' + errorObject.name);
       }
    );

    return;
}