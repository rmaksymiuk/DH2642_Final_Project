import TopArtistView from "../TopArtist/TopArtistView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getTopArtist_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function TopArtist(props) {
    const [index, setIndex] = useState(0);
    const [promiseState] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});

    useEffect(() => {
         if (props.model.token) {
            resolvePromise(getTopArtist_assist(0, props.model.token),promiseState, notifyACB);
        };
       }, []);

    function notifyACB(){
        reRender({});
    }

    function getTopArtistACB(idx, token){
        resolvePromise(getTopArtist_assist(idx, token), promiseState, notifyACB);
    }

    return (
        <div>
            {promiseNoData(promiseState.promise, promiseState.data, promiseState.error)
            ||<TopArtistView data={promiseState.data} token={props.model.token}
                getTopArtist={getTopArtistACB} index={index} idx={setIndex}/>}
        </div>
    )
}