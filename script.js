function GameBoard() {
  const player1 = new Player("Bradley", "o");
  const player2 = new Computer("Computer", "x");

  let gameover = false;
  let currentPlayer = player1;

  const main = document.querySelector(".main");
  const winText = document.querySelector(".win-text");

  let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const checkWin = (symbol) => {
    if (
      gameBoard.slice(0, 3).join("") === [symbol, symbol, symbol].join("") ||
      gameBoard.slice(3, 6).join("") === [symbol, symbol, symbol].join("") ||
      gameBoard.slice(6, 9).join("") === [symbol, symbol, symbol].join("")
    ) {
      console.log("win");
      gameover = true;
    }
    if (
      [gameBoard[0], gameBoard[0 + 3], gameBoard[0 + 6]].join("") ===
        [symbol, symbol, symbol].join("") ||
      [gameBoard[1], gameBoard[1 + 3], gameBoard[1 + 6]].join("") ===
        [symbol, symbol, symbol].join("") ||
      [gameBoard[2], gameBoard[2 + 3], gameBoard[2 + 6]].join("") ===
        [symbol, symbol, symbol].join("")
    ) {
      console.log("win");
      gameover = true;
    }
    if (
      [gameBoard[0], gameBoard[0 + 4], gameBoard[0 + 8]].join("") ===
        [symbol, symbol, symbol].join("") ||
      [gameBoard[2], gameBoard[2 + 2], gameBoard[2 + 4]].join("") ===
        [symbol, symbol, symbol].join("")
    ) {
      console.log("win");
      gameover = true;
    }
  };

  const render = () => {
    gameBoard.flat().forEach((_, i) => {
      let cell = document.createElement("div");
      cell.classList.add(`cell`);
      cell.classList.add(`cell-${i}`);
      main.appendChild(cell);
    });

    let cells = document.querySelectorAll(".cell");

    const move = (e) => {
      if (
        gameover === false &&
        !e.target.closest(".cell").style.backgroundImage
      ) {
        currentPlayer = player1;
        e.target.closest(
          ".cell"
        ).style.backgroundImage = `url('images/${player1.symbol}.png')`;
        gameBoard[e.target.className[e.target.className.length - 1]] =
          player1.symbol;

        checkWin(player1.symbol);

        if (gameover === false) {
          currentPlayer = player2;
          player2.makeMove(gameBoard, cells);
          checkWin(player2.symbol);
        }
      }

      if (gameover === false) {
        if (gameBoard.every((x) => x === "x" || x === "o")) {
          gameover = "Draw";
        }
      }

      if (gameover === true) {
        main.style.filter = "blur(5px)";
        winText.textContent = `${currentPlayer.name} Wins!`;
        winText.style.zIndex = "3";
      } else if (gameover === "Draw") {
        main.style.filter = "blur(5px)";
        winText.textContent = `${gameover}`;
        winText.style.zIndex = "3";
      }
    };

    cells.forEach((ele) => {
      ele.addEventListener("click", move);
    });
  };
  return { render };
}

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

function Computer(name, symbol) {
  this.name = name;
  this.symbol = symbol;

  const makeMove = (board, cellsList) => {
    let random = Math.floor(Math.random() * board.length);
    if (board[random] !== "x" && board[random] !== "o") {
      board[random] = symbol;
      cellsList[random].style.backgroundImage = `url('images/${symbol}.png')`;
    } else if (board.some((x) => x === " ")) {
      makeMove(board, cellsList);
    }
  };

  return { makeMove, name, symbol };
}

const gameBoard = new GameBoard();

gameBoard.render();
