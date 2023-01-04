import React,{useState} from 'react';
import './Navbar.css'
import NavbarView from './NavbarView';

export default function Navbar() {
    const [clicked, setClicked] = useState(false);
    
    function handleClickACB(){
        setClicked(!clicked);
    }
    function loginACB(){
        window.location='/login';
    }
    function logoutACB(){
        window.location='/logout';
    }

    return <NavbarView clicked={clicked} handleClick={handleClickACB} login={loginACB} logout={logoutACB}/>
            
}