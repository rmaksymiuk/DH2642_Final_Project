import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopTracks.css"

const pageName = ["last 4 weeks", "last 6 months", "all time"];

export default function TopTracksView(props){
    const [page, setPage] = useState(0);
    function pageChangeACB(pg){
      props.pg(pg);
      props.getTopTrack(pg, props.token);
    }

    useEffect(()=>{
      setPage(props.page);
    },[]);

    function description(item,index){
        return(
          <tr key={item.id}>
              <td>{index+1}</td>
              <td><img src={item.album.images[2].url} alt={"Image of "+item.album.name}/></td>
              <td>{item.name}</td>
              <td>{item.album.name}</td>
              <td>{item.artists[0].name}</td>
          </tr>
        );
    };

    function tableCounter(number){
      <td>{number}</td>
    }
    
   const size = Array.from({length: 20 }, (_, i) => i + 1)
 
    return (
      <>
        <div className="container">
          <h1 className="title">{"Your Top Tracks ("+pageName[page]+")"}</h1>
          <div className="menu">
              <ul className="tabs">
                 <li className={page===0?'is_active':''} onClick = {() => pageChangeACB(0)}>{pageName[0]}</li>
                 <li className={page===1?'is_active':''} onClick = {() => pageChangeACB(1)}>{pageName[1]}</li>
                 <li className={page===2?'is_active':''} onClick = {() => pageChangeACB(2)}>{pageName[2]}</li> 
              </ul>
          </div>
        </div>
        {props.data?.length?
        <div className="tableDiv">
          <table className="tableStyle">
            <thead>
              <tr>
                <th>No.</th>
                <th>    </th>
                <th>Song Name</th>
                <th>Album Name</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
                {size.map((number)=> tableCounter(number))}
                {props.data.map((item,index) => description(item,index))}
            </tbody>
          </table>
        </div>
        :<div className="texts">You do not have sufficient play records</div>}
      </>
    );
  };
  