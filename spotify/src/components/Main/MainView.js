import './Main.css';
import img from "./spotify logo.png";
import img2 from './no image.jpeg';

export default function MainView(props){
  return (
    <div className="container">
        <div className="profiles">
            <div className="animate__animated animate__pulse animate__slower animate__infinite">
                {props.token&&props.data?.display_name?
                    <div className="message">{"HI! "+ (props.data?.display_name?props.data?.display_name:"")}</div>
                    :<div className="message">Welcome to Trackify!</div>}
            </div>
            {props.token&&props.data?.images?
                <a target="_blank" rel="noreferrer" href={props.data.external_urls.spotify}><img className="user" src={props.data?.images[0]?.url? props.data.images[0].url: img2} alt="User Profile"/></a>
                :<img className="logo" src={img} alt="spotify logo"/>}
      </div>
    </div>
  );
}