import React, { useEffect, useState } from "react";
import axios from "axios";
import './Main.css';
import img from "./spotify logo.png";
import img2 from './no image.jpeg';
import { getDatabase, ref, onValue } from "firebase/database";
const MAIN_ENDPOINT="https://api.spotify.com/v1/me";

export default function Main(props){
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
      if (props.model.token) {
        const db = getDatabase();
        const nameRef = ref(db, 'users/' + props.model.userId + '/name');
        const imgRef = ref(db, 'users/' + props.model.userId + '/profileUrl');
        onValue(nameRef, (snapshot) => {
            const data = snapshot.val();
            setName(data);
        });
        onValue(imgRef, (snapshot) => {
            const data = snapshot.val();
            setImage(data);
        });
    }
    }, []);


    return (
      <div className="container">
        <div className="profiles">
            <div className="animate__animated animate__pulse animate__slower animate__infinite">
                {props.model.token&&name?
                    <div className="message">{"HI! "+ (name?name:"")}</div>
                    :<div className="message">Welcome to Trackify!</div>}
            </div>
            {props.model.token&&image?
                <a target="_blank" rel="noreferrer"><img className="user" src={image} alt="User Profile"/></a>
                :<img className="logo" src={img} alt="spotify logo"/>}
            <div className={props.model.token?"explain2": "explain"}>
              <div className="att">ATTENTION!</div>
              <br/>
              &nbsp;We used 'Spotify API' for our project, but our app is in 'Development mode'. So, only users are on our allowlist can use our app.
              You can use our app with our sample account.
                <div className = "account">
                  ID: kidsland09@naver.com<br/>
                  PW: project23
                </div>
              &nbsp;If you want to test our app with your own account, please send your 'spotify account email address' to <span className="my">'kidsland09@snu.ac.kr'</span>.&nbsp;
              We can add your account in few hours. Since we can add up to 25 users to our app's allowlist, your account can be deleted after a few days.
              <br/>
              &nbsp;For more information about 'development mode' about 'development mode', you can&nbsp;
              <a href="https://developer.spotify.com/documentation/web-api/guides/development-extended-quota-modes/">click here</a>.
            </div>
      </div>
    </div>
    );
};