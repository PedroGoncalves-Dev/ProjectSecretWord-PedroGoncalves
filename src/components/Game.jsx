import './Game.css'

const Game = ({alterna, 
    palavraEscolhida, 
    categoriaEscolhida, 
    letras, 
    letrasAdvinhadas, 
    letrasErradas, 
    tentativas, 
    pontuacao}) => {

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
                        // Se estiver, renderiza um span com a letra
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
                <form>
                    <input type="text" name='letter' maxLength='1' required />
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