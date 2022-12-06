import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <header className="App">
      <Router>
        <Navbar />
      </Router>
    </header>
  );
}

export default App;
