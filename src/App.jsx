
import './App.css'
// react
import { useCallback, useState, useEffect } from 'react'

//data
import { wordList } from './data/word'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

function App() {
  const stage = [
    {id:1 , name: 'start'},
    {id:2, name: 'game'},
    {id:3, name: 'end'},
  ];

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState('')

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState ([])
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  
  const pickeWordAndCategory = () => {
    // escolhe uma categoria aleatoria
    // Obtém um array com todas as chaves do objeto 'words'
    const categories = Object.keys(words);

    // Seleciona uma chave aleatória do array 'categories'
    const category = 
    categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //escolhe a letter aleatoria
    const word = 
    words[category][Math.floor(Math.random() * words[category].length)];

    

    return {category, word}

  }


  const startGame = () => {
    // escolhe a palavra e a categoria
    const {word, category} = pickeWordAndCategory();

    // create an array of letters- separando as letras
    let wordLetters = word.split("");

    // deixando todas no minusculo
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    // fill stage
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters)





    setGameStage(stage[1].name)
  }
  // process the letters of input - processa a letra do input
  const verificarLetra = (letter) => {
    console.log(letter)
  }
  const reiniciarGame = () => {
    setGameStage(stage[0].name)
  }


  return (
    <div className='App'>
        {gameStage === 'start' && <StartScreen alterna={startGame} />}
        {gameStage === 'game' && <Game 
        alterna={verificarLetra} 
        palavraEscolhida={pickedWord} 
        categoriaEscolhida= {pickedCategory} 
        letras= {letters}
        letrasAdvinhadas={guessedLetters}
        letrasErradas={wrongLetters}
        tentativas={guesses}
        pontuacao={score}
        />}
        {gameStage === 'end' && <GameOver alterna={reiniciarGame} />}

    </div>
  )
}

export default App
