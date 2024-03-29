import { MenuItems } from './MenuItems';
import './Navbar.css'
import { Link } from 'react-router-dom';

function CustomLink({to, children, ...props}){
    return(
        <Link to = {to} {...props}>
            {children}
        </Link>
    )
}

export default function SelectMenuView(props){
    return (
    <div className={props.class}>
        {props.token
        ?MenuItems.map((item, index) => {return (
            <li key = {index}>
                <CustomLink  className={item.cName} to ={item.url} >
                    {item.title}
                </CustomLink>
            </li>)})
        :MenuItems.map((item, index) => {return (
            <li key = {index}>
                <CustomLink  className={item.cName} to ="/login" >
                    {item.title}
                </CustomLink>
            </li>)})
        }
        {props.token
        ?<li key = {4}>
        <CustomLink  className='nav-links-mobile' to ='/logout' >
            Log Out
        </CustomLink>
        </li>
        :<li key = {5}>
        <CustomLink  className='nav-links-mobile' to ='/login' >
            Log In
        </CustomLink>
        </li>}
    </div>);
}