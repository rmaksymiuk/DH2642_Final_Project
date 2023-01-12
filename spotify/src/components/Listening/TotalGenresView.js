export default function TotalGenresView(props){
    return (
    <div>
        <div className = "introText">
            You listened to a total of
        </div>
        <div className = "number">
            <b>{props.genres}</b>
        </div>
        <div className = "introText">
            genres this past year!
        </div>
        <div className = "introText">
            The average number of genres listened to by our users is
        </div>
        <div className = "number">
            <b>{props.avgGenres}</b>
        </div>
        <br></br><br></br>
        <div className = "personalizedMessage">
            <b><i>{props.message}</i></b>
        </div>
    </div>
       
    );
        
}