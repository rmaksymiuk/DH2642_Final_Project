export default function TopGenre(props){

    function genreNameACB(element, key){
        return (
            <li key={element[0]}>
                {element[0]}
            </li>);
        
    }

    return (
        <ul>
            {props?.topGenres?.map(genreNameACB)}
        </ul>
        
        );
      
        
}