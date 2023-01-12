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

    }
    , []);

    function notifyACB(){
        reRender({});   
    }

    return (
      <MainView token={props.model.token} data={promiseState?.data?promiseState.data:props.model.profiles}/>
    );
};