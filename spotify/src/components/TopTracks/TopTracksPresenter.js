import TopTracksView from "../TopTracks/TopTracksView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getTopTrack_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function TopTracks(props){
    const [data, setData] = useState();
    const [resi] = useState({promise: null, data: null, error: null})
    const [page, setPage] = useState(0);
    const [,reRender]= useState({});

    useEffect(() => {
      if (props.model.token) {
            resolvePromise(getTopTrack_assist(0, props.model.token),resi, notifyACB);
      }

    }, []);

    function notifyACB(){
        reRender({});
    }

    function getTopTrackACB(idx, token){
        resolvePromise(getTopTrack_assist(idx, token), resi, notifyACB);
    }

    return (
        <div>
            {promiseNoData(resi.promise, resi.data, resi.error)
            ||<TopTracksView data = {resi.data} getTopTrack = {getTopTrackACB} token = {props.model.token}
            page={page} pg={setPage}/>}
        </div>
    )
}