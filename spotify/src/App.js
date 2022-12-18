import React, {useState} from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import TopTrack from './components/TopTracks/TopTracksPresenter';
import TopArtist from './components/TopArtist/TopArtistPresenter';
import Recommendations from './components/Recommendations/RecommendationsPresenter';
import Listening from './components/Listening/Listening';
import Login from './components/LogIn/LogIn';
import {Route, Routes} from 'react-router-dom'
import Main from './components/Main/Main'
import axios from "axios";
import Logout from './components/LogOut/Logout';
import Model from "./Model.js"

function App() {
  const model = new Model();
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="*" element={<Main/>}/>
            <Route path="/topTracks" element={<TopTrack model = {model}/>}/>
            <Route path="/topArtist" element={<TopArtist model = {model}/>}/>
            <Route path="/recommendations" element={<Recommendations model = {model} token = {localStorage.getItem("accessToken")} artists = {["06HL4z0CvFAxyc27GXpf02","09hVIj6vWgoCDtT03h8ZCa"]} tracks = {["0c6xIDDpzE81m2q797ordA","0c6xIDDpzE81m2q797ordA","0c6xIDDpzE81m2q797ordA"]}/>}/>
            <Route path="/listening" element={<Listening model = {model}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    </div>
  );
}

export default App;
