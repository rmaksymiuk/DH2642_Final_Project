import AvgPopularityView from "../Listening/AvgPopularityView.js";
import TotalGenresView from "../Listening/TotalGenresView.js";
import React, { useEffect, useState } from "react";

export default function Listening(props) {
    const [numGenres, setNumGenres] = useState();
    const [avgPopularity, setAvgPopularity] = useState();

    function getArtistGenreACB(artist) {
        return artist.genres;
    }

    function getArtistPopularityACB(artist) {
        return artist.popularity;
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
        debugger;
        setAvgPopularity(average);
    }

    function componentWasCreatedACB(){
        if(props.model.artists) {
            getNumGenres();
            getAveragePopularity();
        }
    }
    React.useEffect(componentWasCreatedACB, [] );

    return <div>
        <AvgPopularityView popularity  = {avgPopularity}/>
        <TotalGenresView genres = {numGenres}/>
    </div>;
}