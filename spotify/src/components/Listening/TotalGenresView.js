export default function TotalGenresView(props){
    return (
    <div>
        <div className = "introText">
            You listened to a total of
        </div>
        <div className = "number">
            {props.genres}
        </div>
        <div className = "introText">
            Genres this past year!
        </div>
    </div>
       
    );
        
}