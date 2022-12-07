import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import LogIn from './components/LogIn/LogIn';
import TopTrack from './components/TopTracks/TopTracks';
import TopArtist from './components/TopArtist/TopArtist';


function App() {
  return (
    <div className="App">
        <Navbar />
        <LogIn />
        <TopTrack/>
        <TopArtist/>
    </div>
  );
}

export default App;
