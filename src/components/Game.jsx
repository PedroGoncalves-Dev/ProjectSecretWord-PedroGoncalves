import { useState, useRef } from 'react';
import './Game.css'

const Game = ({alterna, 
    palavraEscolhida, 
    categoriaEscolhida, 
    letras, 
    letrasAdvinhadas, 
    letrasErradas, 
    tentativas, 
    pontuacao}) => {

        const [letter, setLetter] = useState('')

        // Cria uma referência mutable inicializada com 'null' que pode ser associada a um elemento DOM ou valor persistente
        const letterInputRef = useRef(null)

        const handleSubmit = (e) => {
            e.preventDefault()

            alterna(letter)
            
            setLetter('')

            //aceesa o 'ref' do input e da um focus toda vez que der um submit//
            letterInputRef.current.focus(); 
        }




    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {pontuacao}</span>

            </p>
            <h1>Advinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra : <span>{categoriaEscolhida}</span>
            </h3>
            <p>Você ainda tem {tentativas} tentativas</p>
            <div className="wordContainer">
            {
                // Itera sobre o array 'letras'
                letras.map((letra, i) => 
                    // Verifica se a 'letra' atual está no array 'letrasAdvinhadas'
                    letrasAdvinhadas.includes(letra) ? (
                        <span key={i} className="letter">
                            {letra}
                        </span>
                    ) : (
                        // Se não estiver, renderiza um span com uma classe para representar um espaço em branco
                        <span key={i} className="blankSquare"></span>
                    )
                )}
            </div>
            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    name='letter' 
                    maxLength='1' 
                    required 
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {letrasErradas.map((letter, i ) => (
                    <span key={i}>{letter}</span>
                )
                
                )}
            </div>
            

        </div>
    )
}

export default Game;