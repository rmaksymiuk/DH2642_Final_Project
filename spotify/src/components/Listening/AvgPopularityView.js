import "./Listening.css"
export default function AvgPopularityView(props){
    return(
    <div>
        <div className = "introText">
            The average popularity of your favorite artists is
        </div>
        <div className = "number">
            {props.popularity}/100
        </div>
        <div className = "introText">
            The average popularity of all our users is
        </div>
        <div className = "number">
            {
                props.average
            }
        </div>
        <div>
            {props.message}
        </div>
    </div>
    );
}