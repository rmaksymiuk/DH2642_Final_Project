import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import SelectMenuView from './SelectMenuView.js';
import './Navbar.css'
export default function NavbarView(props){
    function loginhandleACB(){
        props.login();
    }
    function logouthandleACB(){
        props.logout();
    }
    return (
        <nav className = "NavbarItems">
            <Link className="trackify" to= "/" style={{textDecoration: 'none'}}><h1 className="navbar-logo">TRACKIFY<i className="fa-brands fa-spotify"></i></h1></Link>
            <div className="menu-icon" onClick={props.handleClick}>
                <i className={props.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <SelectMenuView token={localStorage.getItem('accessToken')} class={props.clicked ? 'nav-menu active' : 'nav-menu'}/>
            {localStorage.getItem('accessToken')
            ?<Button className="log" color="success" onClick= {logouthandleACB} size="small" variant="contained">Log Out</Button>
            :<Button className="log" color="success" onClick = {loginhandleACB} size="small" variant="contained">Log In</Button>}
        </nav>
    );
}