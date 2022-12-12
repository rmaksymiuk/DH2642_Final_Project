import React, {useState} from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import TopTrack from './components/TopTracks/TopTracks';
import TopArtist from './components/TopArtist/TopArtist';
import Recommendations from './components/Recommendations/Recommendations';
import Listening from './components/Listening/Listening';
import Login from './components/LogIn/LogIn';
import {Route, Routes} from 'react-router-dom'
import Main from './components/Main/Main'
function App() {

  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="*" element={<Main/>}/> 
            <Route path="/topTracks" element={<TopTrack/>}/>
            <Route path="/topArtist" element={<TopArtist/>}/>
            <Route path="/recommendations" element={<Recommendations/>}/>
            <Route path="/listening" element={<Listening/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes> 
    </div>
  );
}

export default App;
