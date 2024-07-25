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
    let currentPlayer = 0;

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
                    players.push(createPlayer("Player 2", "circle"));
                }
            } else {
                if (name.id === "player1") {
                    players.push(createPlayer(name.value, "x"));
                } else {
                    players.push(createPlayer(name.value, "circle"));
                }
            }
        })
        
        return players;
    }

    const handleClick = (e) => {
        let theCell = e.target;
        let mark = players[currentPlayer].mark


        placeMark(theCell, mark);
        switchPlayer();
    }

// place "x" or "o" mark on the cell
    const placeMark = (cell, turn) => {
        cell.classList.add(turn);
    }

// switch turn
    const switchPlayer = () => {
        return currentPlayer = currentPlayer === 0 ? 1 : 0;
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