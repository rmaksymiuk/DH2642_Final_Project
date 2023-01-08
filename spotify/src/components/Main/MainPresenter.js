import React, { useEffect, useState } from "react";
import './Main.css';
import MainView from "./MainView";
import resolvePromise from "../../resolvePromise";
import { getDatabase, ref, onValue } from "firebase/database";
import { getProfiles } from "../../utilities";

export default function Main(props){
    const [promiseState,] = useState({});
    const [,reRender]= useState({});

    if (props.model.token&&!promiseState.promise) 
        resolvePromise(getProfiles(props.model.token), promiseState, notifyACB);
    useEffect(() => {
        /* db = getDatabase();
        const nameRef = ref(db, 'users/' + props.model.userId + '/name');
        const imgRef = ref(db, 'users/' + props.model.userId + '/profileUrl');
        onValue(nameRef, (snapshot) => {
            const data = snapshot.val();
            setName(data);
        });
        onValue(imgRef, (snapshot) => {
            const data = snapshot.val();
            setImage(data);
        });*/
    }
    , []);

    function notifyACB(){
        reRender({});   
    }

    return (
      <MainView token={props.model.token} data={promiseState?.data?promiseState.data:props.model.profiles}/>
    );
};