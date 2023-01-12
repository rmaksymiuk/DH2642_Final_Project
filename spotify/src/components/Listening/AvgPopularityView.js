import "./Listening.css"
export default function AvgPopularityView(props){
    return(
    <div>
        <div className = "introText">
            The average popularity of your favorite artists is
        </div>
        <div className = "number">
            <b>{props.popularity}/100</b>
        </div>
        <div className = "introText">
            The average popularity of all our users is
        </div>
        <div className = "number">
            <b>{
                props.average
            }</b>
        </div>
        <br></br><br></br>
        <div className = "personalizedMessage">
            <b><i>{props.message}</i></b>
        </div>
    </div>
    );
}