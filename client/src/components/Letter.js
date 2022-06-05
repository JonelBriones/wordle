import React, {useContext} from 'react';
import { useEffect } from 'react';
import { AppContext } from '../App'; 
const Letter = ({letterPos,attempVal}) => {
    const {board,correctWord, currAttempt,disabledLetters,setDisabledLetters} = useContext(AppContext)
    const letter = board[attempVal][letterPos];

    const correct = correctWord[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter);
    
    const letterState = currAttempt.attempt > attempVal &&(correct ? "correct" : almost? "almost" : "error");
    useEffect(()=> {
        if(letter !== "" && !correct && !almost) {
            setDisabledLetters((prev)=>[...prev,letter])
        }
    },[currAttempt.attempt])
    return (
        <div className="letter" id={letterState}>{letter}</div>
    )
}
export default Letter;