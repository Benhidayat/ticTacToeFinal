const Boardgame = (() => {

// change the interface to
    const startTheGame = () => {
        const startBtn = document.getElementById('startButton');
        startBtn.addEventListener('click', () => {
            ThePlay.getPlayerName();
            document.getElementById('gameStart').classList.remove('gameStart-show');
            document.getElementById('gameBoard').classList.add('gameBoard-show');
            ThePlay.play();
            setHoverOnEmptyCells();
        })
    
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

// show this round winner
    const showWinner = (winner) => {
        const winningTextMessage = document.querySelector('[winning-message-text]');
        winningTextMessage.innerText = `${winner} Wins!`
    }

    return{
        startTheGame,
        placeMarkOnCells,
        setHoverOnEmptyCells,
        showWinner,
    }

})();

const ThePlay = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const players = [];
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

        Boardgame.placeMarkOnCells(theCell, mark);

        if (checkWinner(mark) === true) {
            document.getElementById('winningMessageWrapper').classList.add('show');
            Boardgame.showWinner(players[currentPlayer].name);
        }
        switchPlayer();
        Boardgame.setHoverOnEmptyCells(mark);
    }

// switch turn
    const switchPlayer = () => {
        return currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    const checkWinner = (mark) => {
        return WINNING_CONDITIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(mark);
            })
        })
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

Boardgame.startTheGame();