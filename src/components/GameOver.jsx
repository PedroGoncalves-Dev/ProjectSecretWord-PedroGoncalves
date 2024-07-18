import './GameOver.css'
const GameOver = ({alterna}) => {
    
    return (
        <div>
            <h1>fim do jogo!</h1>
            <button onClick={alterna}>Reiniciar o jogo!</button>
        </div>
    )
}

export default GameOver;