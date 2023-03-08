import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect,useState } from 'react';
export default function WordSpace(props){
    
    const [hidden,setHidden]=useState([])
    const [correctGuesses, setCorrectGuesses] = useState(["a",'e'])
    const [wrong,setWrong]= useState(0)
    const [guess, setGuess]=useState('')
    const [isDisabled,setIsDisabled]=useState(false)

    
    
    useEffect(()=>{
        const word=props.Chosen.replace("\r","")
        let test="_".repeat(word.length)
        setHidden(test)
        console.log("Hidden word: "+hidden);

        // setGuess(props.guess.toLowerCase())

        if(word.includes(guess)){
          setCorrectGuesses([...correctGuesses, guess])
        }

        else{
          setWrong(wrong+1)
        }
      console.log(correctGuesses);

      


    },[guess])

      const word=props.Chosen.replace("\r","")
      

      function revealLetter() {
        const maskedWord =word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");
        return maskedWord
      }

      function pickLetter(letter){
        setGuess(letter.toLowerCase())
        console.log(guess);
      }
   
      
    return(
        
       <div>

      {props.Alphabet.map((letter,index)=>{
          return(<button key={letter} id={letter} onClick={()=>pickLetter(letter)}>{letter}</button>)
      })
      }

        <h3>Wrongs: {wrong} </h3>
        {revealLetter(word)}
        </div>
    )
}