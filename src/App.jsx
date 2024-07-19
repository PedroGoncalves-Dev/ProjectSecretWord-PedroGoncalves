
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
  
  const pickeWordAndCategory = useCallback(() => {
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

  }, [words])


  const startGame = useCallback( () => {
    // clear all letters
    clearLetterState()

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

    setScore(0)





    setGameStage(stage[1].name)

    // As dependências do useCallback garantem que a função só será recriada se 'pickeWordAndCategory' mudar
  }, [pickeWordAndCategory])

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
  const clearLetterState = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  const vitoria = () => {
    // clear all letters
    clearLetterState()

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

    
  }
  
  useEffect(() => {

    if(guesses <= 0) {
      // reset all stage
      clearLetterState()

      setGameStage(stage[2].name)
    }

  } , [guesses])

  useEffect(() => {
    // Cria um conjunto de letras únicas a partir do array 'letters'
    const uniqueLetters = [...new Set(letters)]
  
    // Verifica se o número de letras adivinhadas é igual ao número de letras únicas
    if (guessedLetters.length === uniqueLetters.length) {
       // Adiciona um atraso de 2 segundos antes de atualizar a pontuação e chamar a função 'vitoria'
    const timer = setTimeout(() => {
      // Atualiza a pontuação incrementando-a em 100 pontos
      setScore((actualScore) => (actualScore += 100));
      
      // Chama a função 'vitoria' para executar as ações de vitória
      vitoria();
    }, 1500); // 2000 milissegundos = 2 segundos

    // Limpeza do timer quando o componente desmontar ou quando 'guessedLetters', 'letters' ou 'vitoria' mudarem
    return () => clearTimeout(timer);
    }
  // O useEffect depende de 'guessedLetters', 'letters' e 'vitoria'. Será executado sempre que qualquer um deles mudar
  }, [guessedLetters, letters, vitoria, ])


  const reiniciarGame = () => {

    setScore(0)
    setGuesses(numeroTentativa)
    setGameStage(stage[0].name)
   
  }
  console.log(pickedWord)


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
        {gameStage === 'end' && <GameOver alterna={reiniciarGame} pontuacao={score} />}

    </div>
  )
}

export default App
