import "./Listening.css"
export default function AvgPopularityView(props){
    return(
    <div>
        <div className = "introText">
            Your favorite artist's average popularity is
        </div>
        <div className = "number">
            {props.popularity}
        </div>
    </div>
    );
}