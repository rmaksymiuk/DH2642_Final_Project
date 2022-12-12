import React, { useEffect, useState } from "react";
import axios from "axios";
import './Main.css';
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
      <>
        <div className="profiles">
            <div className="message">{"HI! "+ (data.display_name?data.display_name:"")}</div>
            {data?.images? <img className="user" src={data.images[0].url}/>:null}
            {console.log(data)}
        </div>
      </>
    );
  };
  