export default function WordSpace(props){
    
    let attempt="n"
    console.log(props.Chosen);
    console.log(props.guess);
    //console.log(props.Chosen.replace("\r",""));
    const word=props.Chosen.replace("\r","")
    return(
        [...word].map((letter,index)=>{
            
            if(props.guess.toLowerCase() === letter){
                return(<li style={{listStyleType: 'none', display:"inline",ariaDisabled:"true"}}>
                    {letter}
                </li>) 
            }
            
            return(<li style={{listStyleType: 'none', display:"inline"}}> _ </li>) 
            
            
            
            
        })
    )
}