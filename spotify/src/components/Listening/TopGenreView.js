export default function TopGenre(props){

    function genreNameACB(element){
        return (
            <li>{element[0]}</li>
        );
    }
    return (
        <div>
            Top 3 Genres:
            <ul>
                
                {props.topGenres.map(genreNameACB)}
            </ul>
        
        </div>
       
    );
        
}