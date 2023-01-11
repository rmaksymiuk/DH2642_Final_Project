import './LogIn.css';

export default function LogInView(props){
    
    return (
        <div className="contin">
        <div className="cont">
          <div className="text">{localStorage.getItem('accessToken')
            ?"Login Successful"
            :"Do you want to use our service?"}</div>
          {!localStorage.getItem('accessToken')
            ?<div className="btns">
              <button className="inbt" onClick={props.handleLogin}>Log In</button>
              <button className="inbt" onClick={props.back}>Go to the Main</button>
            </div>
            :null}
          </div>
          <div className="explain">
              <div className="att">ATTENTION!</div>
              <br/>
              &nbsp;We used 'Spotify API' for our project, but our app is in 'Development mode'. So, only users are on our allowlist can use our app.
              You can use our app with our sample account.
                <div className = "account">
                  ID: kidsland09@naver.com<br/>
                  PW: project23
                </div>
              &nbsp;If you want to test our app with your own account, please send your 'spotify account email address' to <span className="my">'kidsland09@snu.ac.kr'</span>.&nbsp;
              We can add your account in few hours. Since we can add up to 25 users to our app's allowlist, your account can be deleted after a few days.
              <br/>
              &nbsp;For more information about 'development mode' about 'development mode', you can&nbsp;
              <a href="https://developer.spotify.com/documentation/web-api/guides/development-extended-quota-modes/">click here</a>.
            </div>
        </div>
    )
}