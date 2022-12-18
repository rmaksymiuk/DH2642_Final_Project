import AvgPopularityView from "../Listening/AvgPopularityView.js";
import TotalGenresView from "../Listening/TotalGenresView.js";
import React, { useEffect, useState } from "react";

export default function Listening(props) {
    const [numGenres, setNumGenres] = useState();
    const [avgPopularity, setAvgPopularity] = useState();

    function getArtistGenreACB(artist) {
        return artist.genres;
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

    function componentWasCreatedACB(){
        if(props.model.artists) {
            getNumGenres();
        }
    }
    React.useEffect(componentWasCreatedACB, [] );

    return <div>
        <AvgPopularityView/>
        <TotalGenresView genres = {numGenres}/>
    </div>;
}