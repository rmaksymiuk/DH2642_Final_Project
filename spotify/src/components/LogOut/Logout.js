import './Logout.css';

export default function Logout(){
    function handleLogOutACB(){
        localStorage.clear();
    }
    function returnHomeACB(){
        window.location='/';
    }
    return (
        <div className="contcont">
        <div className="cont">
            <div className="byemessage">Do you want to log out?</div>
            <div className="signout">
                <a href="https://trackify-fe471.web.app"><button className="bt" onClick={handleLogOutACB}>Log Out</button></a>
                <button className="bt" onClick={returnHomeACB}>Go Back To Home</button>
            </div>
        </div>
        </div>
      
    )
}