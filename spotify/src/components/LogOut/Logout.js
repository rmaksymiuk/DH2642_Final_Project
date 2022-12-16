export default function Logout(){
    function handleLogOut(){
        localStorage.clear();
    }

    return (
        <div>
            <div className="byemessage">You want to log out?</div>
            <div className="signout">
                <a href="http://localhost:3000"><button onClick={handleLogOut}>signOut</button></a>
            </div>
        </div>
    )
}