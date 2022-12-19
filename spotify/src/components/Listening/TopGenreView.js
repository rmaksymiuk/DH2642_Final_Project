export default function TopGenre(props){

    function genreNameACB(element, key){
        return (
            <div key={element[0]}>
                {element[0]}
            </div>);
        
    }

    return (
    <div>
        <div className = "introText">
            Your favorite genres have been
        </div>
        <div>
            {props?.topGenres?.map(genreNameACB)}
        </div>
    </div>
    );
      
        
}