import { useEffect,useState } from 'react';
import './App.css';
import WordSpace from "./components/wordSpace";




function App() {
  
  const [words,setWords]=useState([])
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0)
  const [guess, setGuess]=useState('')
  const [alphabet,setAlphabet]=useState([])


 useEffect( ()=>{
  const myMarkdownFile = require("./words.txt");
  setCount((count) => count + 1);

  // setGuess('a')

  fetch(myMarkdownFile)
  .then(response => response.text())
  .then(text =>{ 
    const fileLines = text.split('\n')
    console.log(typeof(text))
    console.log(fileLines)
    setWords([fileLines])
    
  })

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
setAlphabet(alpha.map((x) => String.fromCharCode(x)))
console.log(alphabet);
 
  
 
},[])

const generateRandomNumber = () => {
  const random = Math.floor(Math.random() * words[0].length);
  
  setRandomNumber(random)
  console.log("Random num: "+randomNumber);
}

//console.log(words[0].length);

function pickLetter(letter){
  setGuess(letter)
  console.log(guess);
}

  return (
    <div className="App">
      <h1>Assignment prework</h1>
      {alphabet.map((letter,index)=>{
          return(<button onClick={()=>pickLetter(letter)}>{letter}</button>)
      })
      }
      <p> Value of Count: {count} </p>
      <button onClick={generateRandomNumber}>Random Number</button>
      
       {words.map((words,index)=>{
        return(
        <div>
          Picked word: {words[randomNumber]}
          <p>Word length: {words[randomNumber].length-1}</p>
         <WordSpace guess={guess} Chosen={words[randomNumber]} Length={words[randomNumber].length-1}/>
        </div>
        )
      })} 
    </div>
  );
}

export default App;
