export default function AvgYear(props){
    
    function yearACB(element, key){
        return (
            <li key={element[0]}>
                {element[0]}
            </li>);
        
    }
    
    
    
    return (
        <div>
            <div className = "introText">
                You have found yourself listening to the most music from the years:
            </div>
            
            <ul className="number">
                <b>{props?.topYears?.map(yearACB)}</b>
            </ul>   
        </div>
        
       
        );
      
        
}