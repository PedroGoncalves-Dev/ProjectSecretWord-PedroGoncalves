
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

  const numeroTentativa = 3

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState('')

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState ([])
  const [guesses, setGuesses] = useState(numeroTentativa);
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
    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been utlized = 
    //// Verifica se a letra já foi adivinhada ou errada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      // se sim sai da função
      return;
    }

    //push guessed letter or remove guess
    // Se a letra estiver na lista de letras corretas
    if (letters.includes(normalizedLetter)) {
      // Adiciona a letra ao estado de letras adivinhadas
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
         normalizedLetter,
      ])

      setScore(score + 10)
    } else { 
      // Se a letra não estiver na lista de letras corretas
      // Adiciona a letra ao estado de letras erradas
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ])


      //diminui as tentativas cada vez que a letra estiver errada
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

    

  }

  // função para resetar o número de tentativas e as letras erradas
  const clearLetterStage = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {

    if(guesses <= 0) {
      // reset all stage
      clearLetterStage()

      setGameStage(stage[2].name)
    }

  } , [guesses])


  const reiniciarGame = () => {

    setScore(0)
    setGuesses(numeroTentativa)
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
