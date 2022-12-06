import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import Auth from "./components/SignIn/Auth"
import './App.css';


function App() {
  return (
    <div className="App">
        <Navbar />
        <Auth />
    </div>
  );
}

export default App;
