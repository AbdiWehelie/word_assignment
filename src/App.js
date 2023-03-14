import { useEffect,useState } from 'react';
import './App.css';
import WordSpace from "./components/wordSpace";




function App() {
  
  const [words,setWords]=useState([])
  const [randomNumber, setRandomNumber] = useState(0)
  const [alphabet,setAlphabet]=useState([])





 useEffect( ()=>{
  const myMarkdownFile = require("./words.txt");
  
  
  
  //fetches the wordlist from the text file and stores it in an array where a word will be picked at random
  //the words are also split from each new line so each word is its seperate item
  fetch(myMarkdownFile)
  .then(response => response.text())
  .then(text =>{ 
    const fileLines = text.split('\n')
    
    setWords([fileLines])
    
  })

  //creates an array of letters that are used to guess the word
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  setAlphabet(alpha.map((x) => String.fromCharCode(x)))

 
 setRandomNumber(Math.floor(Math.random() * 4000)) 

},[])



//refreshes page to give a new word
const resetGame = () => {
  window.location.reload();
}

//passes the alphabet array and the chosen word in the word array
  return (
    <div className="wrapper">
      
       {words.map((words,index)=>{
        return(
        <div>
         <WordSpace Alphabet={alphabet} Chosen={words[randomNumber]}/>
        </div>
        )
      })}
      <div style={{marginTop: '12px'}}>
      <button onClick={resetGame}>Change word</button>
      </div>
    </div>
  );
}

export default App;
