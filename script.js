const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            document.querySelector(`[data-index="${index}"]`).textContent = marker;
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
    };

    return { getBoard, updateBoard, resetGame };

})();


const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}


const gameFlow = (() => {

    let currentPlayer;
    let playerOne;
    let playerTwo;
    let gameOver = false;

    const startGame = (nameOne, nameTwo) => {
        playerOne = player(nameOne, "X");
        playerTwo = player(nameTwo, "O");
        currentPlayer = playerOne;
        document.querySelector(".resetGamebutton").style.display = "none";
        document.querySelector(".playerTurnInfo").style.display = "block";
        gameOver = false;
        document.querySelector(".playerTurnInfo").textContent = `${playerOne.getName()}'s turn`;
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        //DOM - textContent: current player's turn
        document.querySelector(".playerTurnInfo").textContent = `${currentPlayer.getName()}'s turn`;
    };

    const getCurrentPlayer = () => currentPlayer;

    const triggerGameOver = (winner) => {
        gameOver = true;
        //DOM - textContent: winner or draw
        document.querySelector(".playerTurnInfo").textContent = winner ? `${winner.getName()} wins!!!` : `DRAW!!!`;
        document.querySelector(".resetGamebutton").style.display = "block";
    }

    return { startGame, switchTurn, getCurrentPlayer, triggerGameOver };

})();

const runTurn = (index) => {
    if (!gameFlow.isGameOver && Gameboard.getBoard()[index] === "") {
        const currentPlayer = gameFlow.getCurrentPlayer();
        Gameboard.updateBoard(index, currentPlayer.getMarker());

        if (checkWinner()) {
            gameFlow.triggerGameOver(currentPlayer);
        } else if (checkDraw()) {
            gameFlow.triggerGameOver(null);
        } else {
            gameFlow.switchTurn();
        }
    }
};

const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let combo of winCondition) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};


const checkDraw = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
}

document.querySelector(".startGameButton").addEventListener("click", () => {
    const nameOne = document.querySelector("#playerOne").value || "Player One";
    const nameTwo = document.querySelector("#playerTwo").value || "Player Two";
    gameFlow.startGame(nameOne, nameTwo)

    document.querySelector(".gameBoard").style.display = "grid";
});

document.querySelector(".resetGamebutton").addEventListener("click", () => {
    Gameboard.resetGame();
    const nameOne = document.querySelector("#playerOne").value;
    const nameTwo = document.querySelector("#playerTwo").value;
    gameFlow.startGame(nameOne, nameTwo);
});

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        runTurn(index);
    });
});
