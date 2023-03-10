//import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect,useState } from 'react';
import {Container } from 'react-bootstrap';
export default function WordSpace(props){
    
    
    const word=props.Chosen.replace("\r","")
    const reverseString = str => str ? [...str].reverse().join("") : str;
    //const [hidden,setHidden]=useState([])
    const [correctGuesses, setCorrectGuesses] = useState([])
    const [usedLetter,setUsedLetter]= useState([])
    const [wrong,setWrong]= useState(0)
    const [guess, setGuess]=useState('')
    const [hints, setHints]=useState(0)
    const [childReset,setChildReset]=useState(false)
    

    
    
    useEffect(()=>{
        const word=props.Chosen.replace("\r","")
        //let test="_".repeat(word.length)
        //setHidden(test)
        // console.log("Hidden word: "+hidden);
        setHints(Math.ceil(word.length/3))
        console.log("No# of hints: "+ hints);
        console.log(usedLetter);
        // setGuess(props.guess.toLowerCase())

        if(word.includes(guess)){
          setCorrectGuesses([...correctGuesses, guess])
          setUsedLetter([...usedLetter, guess])
        }

        else{
          setWrong(wrong+1)
          setUsedLetter([...usedLetter, guess])
        }
      // console.log(correctGuesses);

      
      console.log("Before check: "+childReset);
      


    },[guess])

      useEffect(()=>{
        setChildReset(props.Reset)
        if(childReset){
          setCorrectGuesses([])
          setUsedLetter([])
          setHints(Math.floor(word.length/3))
          setWrong(0)
          setChildReset(false)
          console.log("After check: "+childReset);
        }
      },[])
      

      function revealLetter() {
        const maskedWord =word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");
        return maskedWord
      }



      function pickLetter(letter){
        setGuess(letter.toLowerCase())
        console.log(guess);
      }


      function giveHint(){
        let array=reverseString(word)
        array.split('').map((letter,index)=>{
          if(!usedLetter.includes(letter)){
            setCorrectGuesses([...correctGuesses, letter])
            setUsedLetter([...usedLetter,letter])
            setHints(hints-1)
          }
        })
      }

   
      function disableButton(letter) {
        // console.log("disableButton result for: " +letter);
        // console.log(usedLetter.some((x)=>x===letter.toLowerCase()));
        return usedLetter.some((x)=>x===letter.toLowerCase())
      }


      
    return(
        
       <div>
        <Container style={{width:"90vw"}}>
      {props.Alphabet.map((letter,index)=>{
          return(<button variant="info" className="letterButton" key={letter} disabled={disableButton(letter)} id={letter} onClick={()=>pickLetter(letter)}>{letter}</button>)
      })
      }
      </Container>
      <br/>
        <button disabled={hints>0 ? false :true} onClick={()=>giveHint()}>Hint</button>
        
        
        <h3>Wrongs: {wrong} </h3>
        {revealLetter(word)}
        {!revealLetter(word).includes("_") &&  <p>You won!</p>
        
        }
        {wrong >0 && !revealLetter(word).includes("_") ? <h3>You made {wrong} wrong guesses </h3> 
        : !revealLetter(word).includes("_")&& <h2>Perfect!</h2>}
        </div>
    )
}