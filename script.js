// const Gameboard = () => {
//     row = 3;
//     column = 3;
// }
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = function(index, marker) {
        if (board[index] === "") {
            board[index] = marker;
            //DOM - textContent: update cell on the page
        }
    };

    /*
    const resetGame = function() {
        board = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
    };
    */

    return { getBoard, updateBoard, /* resetGame */ }

})();

// function createPlayer (name) {
//     const playName = name;

//     let score = 0;
//     const getScore = () => score;
//     const addScore = () => score++;

//     return { name, getScore, addScore };
// }
const player = function(name, marker) {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}

// function gameFlow() {
//     player 1 turn;
//     player 2 turn;
//     if someone win then gameover
// }

const gameFlow = (function () {

    let currentPlayer;
    let playerOne;
    let playerTwo;
    let gameOver = false;

    const startGame = function(nameOne, nameTwo) {
        playerOne = player(nameOne, "X");
        playerTwo = player(nameTwo, "O");
        currentPlayer = playerOne;
        gameOver = false;
        //DOM - textContent: current player's turn
    };

    const switchTurn = function() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        //DOM - textContent: current player's turn
    };

    const getCurrentPlayer = () => currentPlayer;

    const triggerGameOver = function(winner) {
        gameOver = true;
        //DOM - textContent: winner or draw
    }

    return { startGame, switchTurn, getCurrentPlayer, triggerGameOver };

})();

const runTurn = function(index) {
    if (!gameFlow.isGameOver && Gameboard.getBoard()[index] === "") {
        const currentPlayer = gameFlow.getCurrentPlayer();
        Gameboard.updateBoard(index, currentPlayer.getMarker());
    }

    if(checkWinner()) {
        gameFlow.triggerGameOver(currentPlayer);
    } else if (checkDraw()) {
        gameFlow.triggerGameOver(null);
    } else {
        gameFlow.switchTurn();
    }
}

const checkWinner = function() {
    const board = Gameboard.getBoard();
    const winCondition = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combo of winCondition) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
        return false;
    }
}


const checkDraw = function() {
    return Gameboard.getBoard().every(cell => cell !== "");
}


