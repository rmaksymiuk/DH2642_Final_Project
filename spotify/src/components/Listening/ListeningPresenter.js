import AvgPopularityView from "../Listening/AvgPopularityView.js";
import TotalGenresView from "../Listening/TotalGenresView.js";
import TopGenreView from "../Listening/TopGenreView.js";
import "./Listening.css"
import TopYearPopularityView from "./TopYearPopularityView.js";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, set } from "firebase/database";

export default function Listening(props) {
    const [promiseState] = useState({promise: null, data: null, error: null})
    const [,reRender]= useState({});
    const [artists, setArtists]=React.useState(props.model.currentArtistPromiseState.data);
    const [tracks, setTracks]=React.useState(props.model.currentTrackPromiseState.data);
    const[totalUserPopularities, setTotalUserPopularities] = React.useState(props.model.totalUserPopularities);
    const[totalUsers, setTotalUsers] = React.useState(props.model.totalUsers);
    const[totalUserGenres, setTotalUserGenres] = React.useState(props.model.totalUserGenres);

    const [numGenres, setNumGenres] = useState();
    const [averageGenres, setAverageGenres] = useState();
    const [avgPopularity, setAvgPopularity] = useState();
    const [topGenres, setTopGenres] =  useState();
    const [topYearPopularity, setTopYearPopularity] = useState();
    const [totalUserAvgPop, setTotalUserAvgPop] = useState();
    const [page, setPage] = useState(0);
    const pages = ["Popularity", "Total Genres", "Top Genres", "Top Years"];

    React.useEffect(wasCreatedACB, []);

    function observerACB(){
        setArtists(props.model.currentArtistPromiseState.data);
        setTracks(props.model.currentTrackPromiseState.data);
        setTotalUserPopularities(props.model.totalUserPopularities);
        setTotalUsers(props.model.totalUsers);
        if (artists && tracks) {
            getNumGenresACB();
            getAveragePopularityACB();
            getTopGenresACB();
            getAverageYearACB();
        };
         if(totalUserPopularities && totalUserGenres && totalUsers) {
            getUsersAvgPopACB();
            getUsersGenresACB();
         }
    }

    function wasCreatedACB(){
        props.model.addObserver(observerACB);
         if (artists && tracks) {
            getNumGenresACB();
            getAveragePopularityACB();
            getTopGenresACB();
            getAverageYearACB();
         };
         if(totalUserPopularities && totalUserGenres && totalUsers) {
            getUsersAvgPopACB();
            getUsersGenresACB();
         }
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB);
        };
    }

    function notifyACB(){
        reRender({});
    }

    function getArtistGenreACB(artist) {
        return artist.genres;
    }

    function getArtistPopularityACB(artist) {
        return artist.popularity;
    }

    function getDateACB(track){
        return track.album.release_date;
    }

    function getNumGenresACB() {
        const genres2d = artists.map(getArtistGenreACB);
        const genres1d = [].concat(...genres2d);
        let outputArray = genres1d.filter(function(v, i, self)
                {
                    return i == self.indexOf(v);
                });
        setNumGenres(outputArray.length);
        if(outputArray.length != props.model.profile.totalGenres) {
            props.model.setTotalGenres(outputArray.length);
        }
    }

    function getUsersGenresACB() {
        const genreSum = totalUserGenres;
        const users = totalUsers;
        setAverageGenres(Math.round(genreSum/users));
    }

    function getAveragePopularityACB() {
        const avgPopularity = artists.map(getArtistPopularityACB);
        const sum = avgPopularity.reduce((acc, val) => acc + val, 0);
        const average = Math.floor(sum / avgPopularity.length);
        setAvgPopularity(average);
        const db = getDatabase();
        if(props.model.profile.avgPopularity != average) {
            props.model.setAvgPopularity(average);
        }
    }

    function getUsersAvgPopACB() {
        const popSum = totalUserPopularities;
        const users = totalUsers;
        setTotalUserAvgPop(Math.round(popSum/users));
    }

    function getTopGenresACB() {
        const genres = artists.map(getArtistGenreACB);

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

    function getAverageYearACB() {
        const dates = tracks.map(getDateACB);
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

    if (artists&&tracks&&!numGenres&&!avgPopularity&&!topGenres&&!topYearPopularity) {
        getNumGenresACB();
        getAveragePopularityACB();
        getTopGenresACB();
        getAverageYearACB();
    };

    let component = <TopYearPopularityView topYears = {topYearPopularity}/>
    if(page === 0) {
        let message = "";
        if(avgPopularity < 30) {
            message = "You are an underground indie queen. Don't let anyone try and pluck you out of the alt stream"
        } else if(avgPopularity < totalUserAvgPop) {
            message = "You tend to go your own way with music but won't stop yourself from indulging in what others are also listening to"
        } else if(avgPopularity < 85) {
            message = "You like to stick with the crowd but venture out into the musical universe every now and again"
        } else {
            message = "Do you only listen to the top 40? If so that is impressive, maybe try exploring some of our recommendations"
        }
        component = <AvgPopularityView popularity = {avgPopularity} average = {totalUserAvgPop} message = {message}/>;
    } else if(page === 1) {
        component = <TotalGenresView avgGenres = {averageGenres} genres = {numGenres}/>;
    } else if(page === 2) {
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