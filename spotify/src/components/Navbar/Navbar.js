import React, {Component} from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import {Button} from '../Button'
import {Link, useMatch, useResolvedPath} from 'react-router-dom'

class Navbar extends React.Component {
    state = { clicked: false}
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return (
            <nav className = "NavbarItems">
                <h1 className="navbar-logo">TRACKIFY<i className="fa-brands fa-spotify"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => { 
                        return (<li key = {index}>
                                    <CustomLink  className={item.cName} to ={item.url} >
                                        {item.title}
                                    </CustomLink>
                                </li>)
                        } )}
                </ul>
                <Button>Log in</Button>
            </nav>
        );
    }
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <Link to = {to} {...props}>
            {children}
        </Link>
    )
}

export default Navbar