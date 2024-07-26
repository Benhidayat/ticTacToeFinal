const Boardgame = (() => {

// change the interface to
    const startTheGame = () => {
        const startBtn = document.getElementById('startButton');
        startBtn.addEventListener('click', () => {
            ThePlay.getPlayerName();
            document.getElementById('gameStart').classList.remove('gameStart-show');
            document.getElementById('gameBoard').classList.add('gameBoard-show');
            ThePlay.play();
        })
    
    }

// restart the game
    const restartGame = () => {
        const nextRound = document.getElementById('nextRound');
        nextRound.addEventListener('click', ThePlay.play);
} 

//exit the game
    const exitGame = () => {
        const exitBtn = document.getElementById('exitGame');
        exitBtn.addEventListener('click', ThePlay.resetPlayersInfo);
    }

// placing mark on the cell
    const placeMarkOnCells = (cell, mark) => {
        cell.classList.add(mark);
    }

// hover over empty cells
    const setHoverOnEmptyCells = (mark) => {
        const board = document.getElementById('gameBoard');
        board.classList.remove('x');
        board.classList.remove('circle');

        if (mark === "x") {
            board.classList.add('circle');
        } else  {
            board.classList.add('x')
        }
    }

    return{
        startTheGame,
        placeMarkOnCells,
        setHoverOnEmptyCells,
        restartGame,
        exitGame,
    }

})();

const ThePlay = (() => {
    const cellElements = document.querySelectorAll('[data-cell]'); //targeting all the cells inside the board
    const inputNames = document.querySelectorAll('.player'); //targeting input forms
    const players = []; // array to store players
    let currentPlayer = 0;
    const WINNING_CONDITIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

   const play = () => {
        cellElements.forEach(cell => {
            cell.classList.remove(players[0].mark);
            cell.classList.remove(players[1].mark);
            cell.removeEventListener
            cell.addEventListener('click', handleClick, {once: true});
        })
        document.getElementById('winningMessageWrapper').classList.remove('show');
        Boardgame.setHoverOnEmptyCells();
        console.log(players);


   }

   const getPlayerName = () => {
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

// this function handles when click event happen in the board
    const handleClick = (e) => {
        let theCell = e.target;
        let mark = players[currentPlayer].mark

        Boardgame.placeMarkOnCells(theCell, mark);

        if (checkWinner(mark)) {
            showGameResult(false);
        } else if (isDraw()) {
            showGameResult(true);
        } else {
            switchPlayer();
            Boardgame.setHoverOnEmptyCells(mark);
        }
        
    }

// switch turn
    const switchPlayer = () => {
        return currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

//return true if there was winner
    const checkWinner = (mark) => {
        return WINNING_CONDITIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark);
            })
        })
    }

//show the result of the game
    const showGameResult = (draw) => {
        const winningTextMessage = document.querySelector('[winning-message-text]');

        if (draw) {
            winningTextMessage.innerText = 'Draw!'
        } else {
            winningTextMessage.innerText = `${players[currentPlayer].name} Wins!`
        }
        document.getElementById('winningMessageWrapper').classList.add('show');
    }

// return true if the game is draw
    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(players[0].mark) || cell.classList.contains(players[1].mark);
        })
    }

// function to continue the game
    const playNextRound = () => {
        const nextRound = document.getElementById('nextRound');
        nextRound.addEventListener('click', restartGame);
    }

// reset the players array and make it empty for next game
    const resetPlayersInfo = () => {
        //clear all marks in every cells
        cellElements.forEach(cell => {
            cell.classList.remove(players[0].mark);
            cell.classList.remove(players[1].mark);
            cell.removeEventListener;
        });
        //reset input value after name submitted
        inputNames.forEach(input => {
            input.value = "";
        })
        //remove all the players
        players.length = 0;
        //return the interface to start the game
        document.getElementById('gameBoard').classList.remove('gameBoard-show');
        document.getElementById('winningMessageWrapper').classList.remove('show');
        document.getElementById('gameStart').classList.add('gameStart-show');
    }

    return {
        play,
        getPlayerName,
        playNextRound,
        resetPlayersInfo,
    }

})();


// factory function to create players info
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

Boardgame.startTheGame();
Boardgame.restartGame();
Boardgame.exitGame();