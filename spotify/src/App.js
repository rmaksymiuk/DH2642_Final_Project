import React, {useState} from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import LogIn from './components/LogIn/LogIn';
import TopTrack from './components/TopTracks/TopTracks';
import TopArtist from './components/TopArtist/TopArtist';
import TopGenres from './components/TopGenres/TopGenres';
import Listening from './components/Listening/Listening';
import Login from './components/LogIn/LogIn';
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/topTracks" element={<TopTrack/>}/>
            <Route path="/topArtist" element={<TopArtist/>}/>
            <Route path="/topGenres" element={<TopGenres/>}/>
            <Route path="/listening" element={<Listening/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
