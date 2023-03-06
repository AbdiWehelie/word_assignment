import { useEffect,useState } from 'react';
export default function WordSpace(props){
    
    const [hidden,setHidden]=useState([])

    // console.log(props.Chosen);
    // console.log(props.Chosen.length);
    // console.log(props.guess);
    
    useEffect(()=>{
        const word=props.Chosen.replace("\r","")
        let test="_".repeat(word.length)
       console.log(typeof(test));
        setHidden(test)
        console.log("Hidden word: "+hidden);
    },[])

    function replaceCharacter(index, replacement) {
        
          let newWord=test.slice(0, index) +
          replacement +
          test.slice(index + replacement.length)
        console.log(newWord);
        test=newWord
      }
      

   function updateLetter(index) {
    const letter=props.guess
    console.log(index);
    console.log(typeof(letter));
    // const newEntry=test.replaceAt(index,letter)    
    // setHidden(newEntry)
   }

    const word=props.Chosen.replace("\r","")
    let test="_".repeat(word.length)
    return(
        
       
        
        [...word].map((letter,index)=>{
            
            if(props.guess.toLowerCase() === letter){
                //updateLetter(index)
                replaceCharacter(index,letter)
            }
            
            return(<li style={{listStyleType: 'none', display:"inline"}}> {hidden} </li>) 
            
            
            
            
        })
    )
}