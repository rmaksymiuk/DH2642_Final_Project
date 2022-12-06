
import React, {Component} from 'react';
import { ReactDOM } from 'react-dom';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import {Button} from '../Button'
import {TopTracks} from '../TopTracks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Navbar extends React.Component {
    state = { clicked: false}
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return (
            // Navigation links
            <nav className = "NavbarItems">
                {/* Trakify + Spotify logo */}
                <h1 className="navbar-logo">TRACKIFY<i className="fa-brands fa-spotify"></i></h1>
                {/* either 3 lines or cross */}
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => { 
                        return (<li key = {index}>
                                    <a className={item.cName} href = {item.url}>
                                        {item.title}
                                    </a>
                                </li>)
                        } )}
                </ul>
                <Button>Log in</Button>
            </nav>
        );
    }
}

export default Navbar