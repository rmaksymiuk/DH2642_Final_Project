export default function TopGenre(props){

    function genreNameACB(element){
        return (
            <li>
                {element[0]}
            </li>);
        
    }

    return (
        <ul>
            {props?.topGenres?.map(genreNameACB)}
        </ul>
        
        );
      
        
}