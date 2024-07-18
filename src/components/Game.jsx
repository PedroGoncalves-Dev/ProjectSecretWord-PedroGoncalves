import './Game.css'

const Game = ({alterna}) => {

    return (
        <div>
            <h1>game</h1>
            <button onClick={alterna}>Finalizar jogo!</button>
        </div>
    )
}

export default Game;