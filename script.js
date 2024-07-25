const Game = (() => {

    const startTheGame = () => {
        const startBtn = document.getElementById('startButton');
        startBtn.addEventListener('click', () => {
            ThePlay.getPlayerName();
            document.getElementById('gameStart').classList.remove('gameStart-show');
            document.getElementById('gameBoard').classList.add('gameBoard-show');
            ThePlay.play();
        })
        
        
    }

    return{
        startTheGame,
    }

})();

const ThePlay = (() => {
    const players = [];
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'o';
    let currentPlayer;
    let nextPlayer;

   const play = () => {
        const cellElements = document.querySelectorAll('[data-cell]');
        cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick, {once: true});
        })
   }

   const getPlayerName = () => {
        const inputNames = document.querySelectorAll('.player');
        inputNames.forEach(name => {
            if (!name.value) {
                if (name.id === "player1") {
                    players.push(createPlayer("Player 1", "x"));
                } else {
                    players.push(createPlayer("Player 2", "o"));
                }
            } else {
                if (name.id === "player1") {
                    players.push(createPlayer(name.value, "x"));
                } else {
                    players.push(createPlayer(name.value, "o"));
                }
            }
        })
        
        return players;
    }

    const handleClick = (e) => {
        let theCell = e.target;
        currentPlayer = players[0];
        nextPlayer = players[1];
        let mark = currentPlayer ? X_CLASS : CIRCLE_CLASS;


        placeMark(theCell, mark);

        switchPlayer();

    }

    const placeMark = (cell, turn) => {
        cell.classList.add(turn);
    }

    return {
        play,
        getPlayerName,
    }

})();


//
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

Game.startTheGame();