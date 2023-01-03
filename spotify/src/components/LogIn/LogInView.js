import './LogIn.css';
const CLIENT_ID = "f3249000e56a4740b15910bc9611b894";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/login";
const SCOPES = [
  "user-top-read", "ugc-image-upload", "user-read-playback-state", "user-read-currently-playing",
  "playlist-read-private", "playlist-read-collaborative", "user-follow-read", "user-read-playback-position",
  "user-read-recently-played", "user-library-read", "user-read-private", "user-read-email"
];
const PARAM=SCOPES.join("%20");

export default function LogInView(props){
    function handleLoginACB() {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PARAM}&response_type=token&show_dialog=true`;
      };
    
    function backACB(){
        window.location='/';
      }
    return (
        <div className="contin">
        <div className="cont">
          <div className="text">{localStorage.getItem('accessToken')
            ?"Login Successful"
            :"Do you want to use our service?"}</div>
          {!localStorage.getItem('accessToken')
            ?<div className="btns">
              <button className="inbt" onClick={handleLoginACB}>Log In</button>
              <button className="inbt" onClick={backACB}>Go to the Main</button>
            </div>
            :null}
          </div>
        </div>
    )
}