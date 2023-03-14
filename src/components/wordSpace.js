import { useEffect,useState } from 'react';
import {Container } from 'react-bootstrap';
export default function WordSpace(props){
    
    
    //the words have additonal characters that need to be removed with .replace()
    const word=props.Chosen.replace("\r","")

    //used to create a reversed string so the hints will start at the first letter
    const reverseString = str => str ? [...str].reverse().join("") : str;



    const [correctGuesses, setCorrectGuesses] = useState([])
    const [usedLetter,setUsedLetter]= useState([])
    const [wrong,setWrong]= useState(0)
    const [guess, setGuess]=useState('')
    const [hints, setHints]=useState(0)
    

    
    
    useEffect(()=>{
        const word=props.Chosen.replace("\r","")
        
        // sets a number of hints based on how long a word is
        setHints(Math.ceil(word.length/3)+1)
        



        //if guessed letter is found in word
        if(word.includes(guess)){
          setCorrectGuesses([...correctGuesses, guess])
          setUsedLetter([...usedLetter, guess])
        }

        //if guessed letter is not found in the word
        else{
          setWrong(wrong+1)
          setUsedLetter([...usedLetter, guess])
        }
      

      
      


    },[guess])

      
      //iterates through the word and displays any correct guesses in the correct spot 
      function revealLetter() {
        const maskedWord =word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");
        return maskedWord
      }


      // when a letter on the board is clicked, sets the guess to 
      function pickLetter(letter){
        setGuess(letter.toLowerCase())
      }


      //gives hints based on the number determined by the word's length and goes down each use
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

      //if a letter is used, makes the button disabled since it doesn't need to be pused again
      function disableButton(letter) {
        return usedLetter.some((x)=>x===letter.toLowerCase())
      }


      
    return(
        
       <div >
        <Container style={{width:"90%",margin:"auto",color: "#05003D"}}>
        <h2 className='word'>{revealLetter(word)}</h2>
        {!revealLetter(word).includes("_") &&  <p><h3>You won!</h3></p>
        
        }
        {wrong >0 && !revealLetter(word).includes("_") ? <h3>You made {wrong} wrong guesses </h3> 
        : !revealLetter(word).includes("_")&& <h2 style={{color:"#ad9b1ff7"}}>Perfect!</h2>}
      {props.Alphabet.map((letter,index)=>{
          return(<button variant="info" className="letterButton" key={letter} disabled={disableButton(letter)} id={letter} onClick={()=>pickLetter(letter)}>{letter}</button>)
      })
      }
      </Container>
      <br/>
      <br/>
      <br/>
          <Container className='information'>    
              <button className='hintBtn' disabled={hints>0 ? false :true} onClick={()=>giveHint()}>Hint</button>
              <h3>Hints left: {hints} </h3>
              <h3>Wrongs: {wrong} </h3>
          </Container>
        
        </div>
    )
}