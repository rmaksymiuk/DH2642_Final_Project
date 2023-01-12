import './Main.css';
import img from "./image/spotify logo.png";
import img2 from './image/no image.jpeg';
import list from './image/list.png';
import headset from './image/headset.png';
import thumbsup from './image/thumbsup.png';
import history from './image/history.png';
export default function MainView(props){
  return (
    <div className="container">
        <div className="profiles">
            <div className="animate__animated animate__pulse animate__slower animate__infinite">
                {props.token&&props.data?.display_name?
                    <div className="message">{"Hi "+ (props.data?.display_name?props.data?.display_name:"")+"!"}</div>
                    :<div className="message">Welcome to Trackify!</div>}
            </div>
            {props.token&&props.data?.images?
                <a target="_blank" rel="noreferrer" href={props.data.external_urls.spotify}><img className="user" src={props.data?.images[0]?.url? props.data.images[0].url: img2} alt="User Profile"/></a>
                :<img className="logo" src={img} alt="spotify logo"/>}
      </div>
      <div className="funcexp">
          <ul className="func">
            <li className="logy logy2">
              <img className="mainimg" src={list} alt="chart logo"/>
              <div className="specific">
                <div className="tit">Your own charts</div>
                <div className="titexp">View your most listened to tracks and artists. Switch between different time periods to see how your listening habits have changed! <b>Your data is updated almost every day.</b></div>
              </div>
            </li>
            <li className="logy">
              <img className="mainimg" src={headset} alt="headset"/>
              <div className="specific">
                <div className="tit">Listening to music</div>
                <div className="titexp">Enjoy listening to your most listened to tracks or artists in your spotify app. Simply <b>click on the track or artists !</b></div>
              </div>
            </li>
            <li className="logy">
              <img className="mainimg" src={thumbsup} alt="thumbs up"/>
              <div className="specific">
                <div className="tit">Recommendations based on your play records</div>
                <div className="titexp">View our <b>personalized recommendations</b> based on a unique combination your most listened tracks and artists.</div>
              </div>
            </li>
            <li className="logy logy3">
              <img className="mainimg" src={history} alt="history"/>
              <div className="specific">
                <div className="tit">Overall Statistics</div>
                <div className="titexp"><b>Get information on your listening habits</b> such as how popular the artists you listen to tend to be, how many different genres you have listened to, your favorite genres and so on!</div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  );
}