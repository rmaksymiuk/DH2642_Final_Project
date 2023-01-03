import './Logout.css'
export default function LogoutView(props){
    return (
    <div className="contcont">
        <div className="cont">
            <div className="byemessage">Do you want to log out?</div>
            <div className="signout">
                <a href="http://localhost:3000"><button className="bt" onClick={props.handleLogOut}>Log Out</button></a>
                <button className="bt" onClick={props.returnHome}>Go Back To Home</button>
            </div>
        </div>
        </div>
    );  
}