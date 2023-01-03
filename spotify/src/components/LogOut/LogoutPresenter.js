import './Logout.css';
import LogoutView from './LogoutView';
export default function Logout(){
    function handleLogOutACB(){
        localStorage.clear();
    }
    function returnHomeACB(){
        window.location='/';
    }
    return (
        <LogoutView returnHome={returnHomeACB} handleLogOut={handleLogOutACB}/>
    )
}