import './GameOver.css'
const GameOver = ({alterna, pontuacao}) => {
    
    return (
        <div>
            <h1>fim do jogo!</h1>
            <h2>A sua pontuação foi: <span>{pontuacao} { pontuacao === 0 ? 'ponto' : 'pontos'}</span></h2>
            <button onClick={alterna}>Reiniciar o jogo!</button>
        </div>
    )
}

export default GameOver;