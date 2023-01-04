import TopTracksView from "../TopTracks/TopTracksView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getTopTrack_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function TopTracks(props){
  const [page, setPage]=useState(0);  
  const [promiseState] = useState({promise: null, data: null, error: null});
  const [,reRender]= useState({});

   useEffect(() => {
     if (props.model.token) {
        resolvePromise(getTopTrack_assist(0, props.model.token), promiseState, notifyACB);
    }
   }, []);

    function notifyACB(){
        reRender({});
    }

    function getTopTrackACB(idx, token){
        resolvePromise(getTopTrack_assist(idx, token), promiseState, notifyACB);
    }

    return (
        <div>
            {promiseNoData(promiseState.promise, promiseState.data, promiseState.error)
            ||<TopTracksView data = {promiseState.data} token = {props.model.token}
            getTopTrack = {getTopTrackACB} page={page} pg={setPage}/>}
        </div>
    )
}