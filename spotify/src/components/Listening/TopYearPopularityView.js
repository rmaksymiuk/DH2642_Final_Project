export default function AvgYear(props){
    
    function yearACB(element, key){
        return (
            <li key={element[0]}>
                {element[0]}
            </li>);
        
    }
    
    
    
    return (
        
        <ul>
            {props?.topYears?.map(yearACB)}
        </ul>
            
       
        );
      
        
}