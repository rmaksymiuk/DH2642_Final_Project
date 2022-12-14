import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopArtist.css"
const TOPARTIST_ENDPOINT="https://api.spotify.com/v1/me/top/artists";
const timeRange=["short_term", "medium_term", "long_term"];
const tabArr=["last 4 weeks", "last 6 months", "all time"];

export default function TopArtist(){
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
        getTopArtist(0, localStorage.getItem("accessToken"));
      };
    }, []);
    function getTopArtist(idx, Token=token) {
      axios
        .get(TOPARTIST_ENDPOINT+"?time_range="+timeRange[idx]+"&limit=20", {
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

    function changeClick(idx){
      setIndex(idx);
      getTopArtist(idx);
    }

    function findDetails(idx, item){
      return <div className="details" key={item.id}>
                <a target="_blank" rel="noreferrer" href={item.external_urls.spotify}><img src={item.images[1].url} alt={"Image of "+item.name}/></a>
                <div className="artist">{(idx+1)+". "+item.name}</div> 
              </div>
    };
    
    return (
      <>
        <div className="container">
          <h1 className="title">{"Top Artists ("+tabArr[index]+")"}</h1>
          <div className="menu">
            <ul className="tabs">
                <li className={index===0?'is_active':''} onClick={()=>{changeClick(0)}}>{tabArr[0]}</li>
                <li className={index===1?'is_active':''} onClick={()=>{changeClick(1)}}>{tabArr[1]}</li>
                <li className={index===2?'is_active':''} onClick={()=>{changeClick(2)}}>{tabArr[2]}</li>
            </ul>
          </div>
          {data?.total
          ?<div className="contents">
            {data.items.map((item, index)=>{return findDetails(index, item)})}
          </div>
          :<div className="message">"You do not have sufficient play records."</div>}
        </div>
      </>
    );
  };
  