import firebaseConfig from "firebaseConfig.js";
import Model from "./Model.js";
const TOPTRACK_ENDPOINT="https://api.spotify.com/v1/me/top/tracks";
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";

firebase.initializeApp(firebaseConfig);

export function observerRecap(model) {
    model.addObserver(function paramACB(payload){console.log(payload);});
}

export function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        let dishes = firebaseData.val()?.artists ? firebaseData.val().artists : [];
        let guests = firebaseData.val()?.tracks ? firebaseData.val().tracks : [];
        function createModelACB(dishArray) {
             return new DinnerModel(guests, dishArray)
        }
        return Promise.all([
                axios.get(TOPTRACK_ENDPOINT+"?limit=20", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                         "Content-Type": "application/json"
                    },
                }).then((response) => {
                    this.tracks = response.data.items;
                }),
                axios.get(TOPARTIST_ENDPOINT+"?limit=20", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                         "Content-Type": "application/json"
                    },
                }).then((response) => {
                    this.tracks = response.data.items;
                }),
              ]).then(createModelACB);
    }
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export function updateFirebaseFromModel(model) {
    function addFirebaseACB(payload) {
        if (!payload)
            return;
        if(payload.setGuest !== undefined) {
            firebase.database().ref(REF+"/guests").set(model.numberOfGuests);
       } else if(payload.setDish !== undefined) {
            firebase.database().ref(REF+"/currentDish").set(model.currentDish);
       } else if(payload.addDish !== undefined) {
            firebase.database().ref(REF+"/dishes/" + payload.addDish.id).set(payload.addDish.title);
       } else if(payload.deleteDish !== undefined) {
            firebase.database().ref(REF+"/dishes/" + payload.deleteDish.id).set(null);
       }
    }
    model.addObserver(addFirebaseACB);
    return;
}

export function updateModelFromFirebase(model) {
    firebase.database().ref(REF+"/guests").on("value",
       function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());}
    );
    firebase.database().ref(REF+"/currentDish").on("value",
       function dishChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());}
    );
    function fetchDishData(id) {

    }
    firebase.database().ref(REF+"/dishes").on("child_added",
       function dishAddedInFirebaseACB(firebaseData){
       	    function addSupportCB(dish){
       		    return dish.id == +firebaseData.key;
       	    }
       	    let dish=model.dishes.find(addSupportCB);
       	    if(!dish) {
       	        getDishDetails(+firebaseData.key).then(function addDishACB(dish){model.addToMenu(dish)});
       	    }
       }
    );
    firebase.database().ref(REF+"/dishes").on("child_removed",
       function dishRemovedInFirebaseACB(firebaseData){model.removeFromMenu({id: +firebaseData.key});}
    );


    return;
}
