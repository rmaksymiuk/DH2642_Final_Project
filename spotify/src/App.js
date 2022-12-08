import React, {useState} from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import LogIn from './components/LogIn/LogIn';
import TopTrack from './components/TopTracks/TopTracks';
import TopArtist from './components/TopArtist/TopArtist';
import TopGenres from './components/TopGenres/TopGenres';
import Listening from './components/Listening/Listening';
import Login from './components/LogIn/LogIn';

function App() {
  let Component
  const [active, setActive]  = useState("");

  switch(window.location.pathname) {
    case "/":
      Component = App
      break
    case "/topTracks":
      Component = TopTrack
      break
    case "/topArtist":
      Component = TopArtist
      break
    case "/topGenres":
      Component = TopGenres
      break
    case "/listening":
      Component = Listening
      break
    case "/login":
      Component = Login
      break
  }
  return (
    <div className="App">
        <Navbar />
        <Component />

    </div>
  );
}

export default App;
