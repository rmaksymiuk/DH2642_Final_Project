import AvgPopularityView from "../Listening/AvgPopularityView.js";
import TotalGenresView from "../Listening/TotalGenresView.js";
import TopGenreView from "../Listening/TopGenreView.js";
import "./Listening.css"
import TopYearPopularityView from "./TopYearPopularityView.js";
import React, { useEffect, useState } from "react";

export default function Listening(props) {
    const [numGenres, setNumGenres] = useState();
    const [avgPopularity, setAvgPopularity] = useState();
    const [topGenres, setTopGenres] =  useState();
    const [topYearPopularity, setTopYearPopularity] = useState();
    const [page, setPage] = useState(0);
    const pages = ["Popularity", "Total Genres", "Top Genres", "Top Years"];

    function getArtistGenreACB(artist) {
        return artist.genres;
    }

    function getArtistPopularityACB(artist) {
        return artist.popularity;
    }

    function getDateACB(track){
        return track.album.release_date;
    }
    function getNumGenres() {
        const genres2d = props.model.artists.map(getArtistGenreACB);
        const genres1d = [].concat(...genres2d);
        let outputArray = genres1d.filter(function(v, i, self)
                {
                    return i == self.indexOf(v);
                });
        setNumGenres(outputArray.length)
    }

    function getAveragePopularity() {
        const avgPopularity = props.model.artists.map(getArtistPopularityACB);
        const sum = avgPopularity.reduce((acc, val) => acc + val, 0);
        const average = Math.floor(sum / avgPopularity.length);
        setAvgPopularity(average);
    }

    function getTopGenres() {
        const genres = props.model.artists.map(getArtistGenreACB);

        const counts = genres.reduce((counts, array) => {
            for (const element of array) {
              if (element in counts) {
                counts[element]++;
              } else {
                counts[element] = 1;
              }
            }
            return counts;
          }, {});
        
          const topThree = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

          setTopGenres(topThree);
        
    }

    function getAverageYear() {
        const dates = props?.model.tracks.map(getDateACB);
        const years = dates.map(date => (date.substring(0,4)));
        
        const count = years.reduce((accumulator, current) => {
            if (accumulator[current]) {
              accumulator[current]++;
            } else {
              accumulator[current] = 1;
            }
            return accumulator;
          }, {});
        
        const topThree = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

        setTopYearPopularity(topThree);
    }

    function pageChangeACB(pg){
      setPage(pg);
    }

    function componentWasCreatedACB(){
        if(props.model.artists) {
            getNumGenres();
            getAveragePopularity();
            getTopGenres();
            getAverageYear();
        }
    }
    React.useEffect(componentWasCreatedACB, [] );

    let component = <TopYearPopularityView topYears = {topYearPopularity}/>
    if(page == 0) {
        component = <AvgPopularityView popularity = {avgPopularity}/>;
    } else if(page == 1) {
        component = <TotalGenresView genres = {numGenres}/>;
    } else if(page == 2) {
        component = <TopGenreView topGenres = {topGenres}/>
    }

    return <div className = "page">
          <div className="menu">
              <ul className="tabs">
                 <li className={page===0?'is_active':''} onClick = {() => pageChangeACB(0)}>{pages[0]}</li>
                 <li className={page===1?'is_active':''} onClick = {() => pageChangeACB(1)}>{pages[1]}</li>
                 <li className={page===2?'is_active':''} onClick = {() => pageChangeACB(2)}>{pages[2]}</li>
                 <li className={page===3?'is_active':''} onClick = {() => pageChangeACB(3)}>{pages[3]}</li>
              </ul>
          </div>
          {component}
    </div>;
}