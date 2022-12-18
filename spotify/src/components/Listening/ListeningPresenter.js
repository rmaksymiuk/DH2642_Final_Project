import AvgPopularityView from "../Listening/AvgPopularityView.js";
import TotalGenresView from "../Listening/TotalGenresView.js";
import TopGenreView from "../Listening/TopGenreView.js";
import TopYearPopularityView from "./TopYearPopularityView.js";
import React, { useEffect, useState } from "react";

export default function Listening(props) {
    const [numGenres, setNumGenres] = useState();
    const [avgPopularity, setAvgPopularity] = useState();
    const [topGenres, setTopGenres] =  useState();
    const [topYearPopulariy, setTopYearPopulariy] = useState();
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

        setTopYearPopulariy(topThree);
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

    return <div>
        <TopYearPopularityView topYears = {topYearPopulariy}/>
        <TopGenreView topGenres = {topGenres}/>
        <AvgPopularityView popularity  = {avgPopularity}/>
        <TotalGenresView genres = {numGenres}/>
    </div>;
}