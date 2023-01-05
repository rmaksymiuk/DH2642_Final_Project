import React from 'react'
import Navbar from "./components/Navbar/NavbarPresenter"
import './App.css';
import TopTrack from './components/TopTracks/TopTracksPresenter';
import TopArtist from './components/TopArtist/TopArtistPresenter';
import Recommendations from './components/Recommendations/RecommendationsPresenter';
import Listening from './components/Listening/ListeningPresenter';
import Login from './components/LogIn/LogInPresenter';
import {Route, Routes} from 'react-router-dom'
import Main from './components/Main/MainView'
import Logout from './components/LogOut/LogoutPresenter';

function App(props) {
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="*" element={<Main model = {props.model}/>}/>
            <Route path="/topTracks" element={<TopTrack model = {props.model}/>}/>
            <Route path="/topArtist" element={<TopArtist model = {props.model}/>}/>
            <Route path="/recommendations" element={<Recommendations model = {props.model}/>}/>
            <Route path="/listening" element={<Listening model = {props.model}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    </div>
  );
}

export default App;
