import './App.css';
import React, {createContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Board from './components/Board';
import { boardDefault,generateWordSet } from './Words';
import Keyboard from './components/Keyboard';
import { useEffect } from 'react';
export const AppContext = createContext();
function App() {
  const [board,setBoard] = useState(boardDefault);
  const [currAttempt,setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0
  })
  const [wordSet,setWordSet] = useState(new Set());
  const [disabledLetters,setDisabledLetters] = useState([])

  const correctWord = "RIGHT";
  const [error,setError] = useState("")
  const [gameOver,setGameOver] = useState("")
  const refreshPage = () => {
    window.location.reload(false);
  }
  useEffect(() => {
    generateWordSet().then((words)=> {
      console.log(words)
      setWordSet(words.wordSet);
    })
  },[])

  const onSelectLetter = (keyVal) => {
    if(currAttempt.letterPos > 4) return;
      const newBoard = [...board]
      newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }
  const onDelete = () => {
    if(currAttempt.letterPos === 0) return;
      const newBoard = [...board]
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(newBoard)
      setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }
  const onEnter = () => {
    if(currAttempt.letterPos !== 5) return;
    let currWord = "";

    for(let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    } 
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt +1, letterPos: 0})
      setError("")
    }
    else {
      console.log(currWord)
      setError("Not a Word!")
      // alert("Word Not Found")
    }
    if (currWord === correctWord) {
      setGameOver(`You correctly guessed the word: ${correctWord}`)
      return;
      // alert("Game Over!")
    }
    if (currAttempt.attempt === 5) {
      setGameOver(`The correct word was: ${correctWord} `)
    }
  }
  return (
    <div className="App">
        <nav>
          <h3>Wordle</h3></nav>
        <AppContext.Provider value={{board,setBoard,currAttempt,setCurrAttempt, onDelete, onEnter, onSelectLetter,correctWord,disabledLetters,setDisabledLetters}}>
        <div className="game">
          <Board/>
          {
          <>{error?
          <><h3>{error}</h3>
          <h3>Attempts Left: {6 - currAttempt.attempt}</h3>
          <Keyboard/>
          </>:gameOver?
          <>
          <h3>{gameOver}</h3>
          <h3>Attempts Left: {6 - currAttempt.attempt}</h3>
          <button onClick={refreshPage}>Play Again</button>
          </>
          :
          <>
          <h3>Attempts Left: {6 - currAttempt.attempt}</h3>
          <Keyboard/>
          </>
          }</>
          }
        </div>
        </AppContext.Provider>
    </div>
  );
}

export default App;
