export default function TotalGenresView(props){
    return (
        <div>
            <ul>
                <li> You have listened in total of { props.genres} genres.</li>
                <li> {props.popularity}</li>
            </ul>
           
        </div>
       
    );
        
}