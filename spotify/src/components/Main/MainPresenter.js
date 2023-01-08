import React, { useEffect, useState } from "react";
import './Main.css';
import MainView from "./MainView";
import {getProfiles} from '../../utilities.js'
import { getDatabase, ref, onValue } from "firebase/database";

export default function Main(props){
    const [data, setData] = useState({})
    useEffect(() => {
      if (props.model.token) {
        getProfiles(props.model.token, setDataACB);
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
    }, []);

    function setDataACB(result){
      setData(result);
    }
    return (
      <MainView token={props.model.token} data={data}/>
    );
};