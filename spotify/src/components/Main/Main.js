import React, { useEffect, useState } from "react";
import axios from "axios";
import './Main.css';
import img from "./spotify logo.png";

const MAIN_ENDPOINT="https://api.spotify.com/v1/me";

export default function Main(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        getProfiles(localStorage.getItem("accessToken"));
    }
    }, []);
  
    function getProfiles(Token) {
        axios
          .get(MAIN_ENDPOINT, {
            headers: {
              "Authorization": "Bearer " + Token,
              "Content-Type": "application/json"
            },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
    return (
      <div className="container">
        <div className="profiles">
            <div className="animate__animated animate__pulse animate__slower animate__infinite">
                {token&&(data?.display_name)? 
                    <div className="message">{"HI! "+ (data.display_name?data.display_name:"")}</div>
                    :<div className="message">Welcome to Trackify!</div>}
            </div>
            {token&&(data?.images)? 
                <a target="_blank" rel="noreferrer" href={data.external_urls.spotify}><img className="user" src={data.images[0].url} alt="User Profile"/></a>
                :<img className="logo" src={img} alt="spotify logo"/>}
      </div>
    </div>
    );
};