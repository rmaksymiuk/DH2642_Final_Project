import React, {Component} from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'
import Button from '@mui/material/Button';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {Theme} from "../../Theme.js"

class Navbar extends React.Component {
    state = {clicked: false}
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return (
            <nav className = "NavbarItems">
                <Link to= "/" style={{textDecoration: 'none'}}><h1 className="navbar-logo">TRACKIFY<i className="fa-brands fa-spotify"></i></h1></Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {localStorage.getItem('accessToken')
                    ?MenuItems.map((item, index) => { 
                        return (
                        <li key = {index}>
                            <CustomLink  className={item.cName} to ={item.url} >
                                {item.title}
                            </CustomLink>
                        </li>)
                        })
                    :MenuItems.map((item, index) => { 
                        return (
                        <li key = {index}>
                            <CustomLink  className={item.cName} to ="/login" >
                                {item.title}
                            </CustomLink>

                            {/* <CustomLink  className={item.cName} to ="/logout" >
                                {item.title}
                            </CustomLink> */}
                        </li>

                        )
                        
                        })
                    }
                </ul>
                    {localStorage.getItem('accessToken')?<Button color="success" onClick= {logoutACB} size="small" variant="contained">Log Out</Button>:<Button color="success" onClick = {loginACB} size="small" variant="contained">Log In</Button>}
            </nav>
        );
}
}

function loginACB() {
    window.location.pathname = '/login'
}

function logoutACB(){
    window.location='/logout'
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