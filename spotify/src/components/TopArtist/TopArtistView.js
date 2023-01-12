import React, { useEffect, useState } from "react";
import "./TopArtist.css";
const tabArr=["last 4 weeks", "last 6 months", "all time"];

export default function TopArtistView(props){
    const [index, setIndex] = useState(0);
    function pageChangeACB(idx){
      props.idx(idx);
      props.getTopArtist(idx, props.token);
    }

    function findDetails(idx, item){
      return <div className="details" key={item.id}>
                <a target="_blank" rel="noreferrer" href={item.external_urls.spotify}><img src={item.images[1].url} alt={"Image of "+item.name}/></a>
                <div className="artist">{(idx+1)+". "+item.name}</div> 
              </div>
    };

    useEffect(()=>{
      setIndex(props.index);
    },[]);
    
    return (
      <>
        <div className="container">
          <h1 className="title">{"Your Top Artists ("+tabArr[index]+")"}</h1>
          <div className="menu">
            <ul className="tabs">
                <li className={props.index===0?'is_active':''} onClick={()=>{pageChangeACB(0)}}>{tabArr[0]}</li>
                <li className={props.index===1?'is_active':''} onClick={()=>{pageChangeACB(1)}}>{tabArr[1]}</li>
                <li className={props.index===2?'is_active':''} onClick={()=>{pageChangeACB(2)}}>{tabArr[2]}</li>
            </ul>
          </div>
          {props.data?.length
          ?<div className="contents">
            {props.data.map((item, index)=>{return findDetails(index, item)})}
          </div>
          :<div className="messages">You do not have sufficient play records</div>}
        </div>
      </>
    );
  };
  