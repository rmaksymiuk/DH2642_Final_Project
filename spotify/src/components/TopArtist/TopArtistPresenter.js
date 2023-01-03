import TopArtistView from "../TopArtist/TopArtistView.js";
import React, { useEffect, useState } from "react";
import resolvePromise from '../../resolvePromise.js'
import {getTopArtist_assist} from '../../utilities.js';
import promiseNoData from '../../promiseNoData';

export default function TopArtist(props) {
    const [data, setData] = useState({});
    const [resi] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});

    useEffect(() => {
         if (props.model.token) {
            resolvePromise(getTopArtist_assist(0, props.model.token),resi, notifyACB);
        };
       }, []);

    function notifyACB(){
        reRender({});
    }

    function getTopArtistACB(idx, token){
        resolvePromise(getTopArtist_assist(idx, token), resi, notifyACB);
    }

    return (
        <div>
            {promiseNoData(resi.promise, resi.data, resi.error)
            ||<TopArtistView data={resi.data} token={props.model.token}
                getTopArtist={getTopArtistACB}/>}
        </div>
    )
}