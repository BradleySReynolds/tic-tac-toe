const winTextBtn = document.querySelector(".win-text--btn");
const ipt = document.querySelector(".name");

const player1 = new Player("User", "o", true);
const player2 = new Player("Computer", "x", false);

function GameBoard() {
  let currentPlayer = player1;
  let gameover = false;

  const main = document.querySelector(".main");
  const winText = document.querySelector(".win-text");
  const winTextPara = document.querySelector(".win-text--para");

  let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const changeName = (newName) => {
    player1.name = newName;
  };

  ipt.addEventListener("change", (e) => {
    e.target.value !== "" ? changeName(e.target.value) : changeName("User");
  });

  const checkHorizontal = (start, stop, symbol) => {
    return (
      gameBoard.slice(start, stop).join("") ===
      [symbol, symbol, symbol].join("")
    );
  };

  const checkVertical = (start, symbol) => {
    return (
      [gameBoard[start], gameBoard[start + 3], gameBoard[start + 6]].join(
        ""
      ) === [symbol, symbol, symbol].join("")
    );
  };

  const checkDiagnal = (start, symbol) => {
    if (start === 0) {
      return (
        [gameBoard[start], gameBoard[start + 4], gameBoard[start + 8]].join(
          ""
        ) === [symbol, symbol, symbol].join("")
      );
    } else {
      return (
        [gameBoard[start], gameBoard[start + 2], gameBoard[start + 4]].join(
          ""
        ) === [symbol, symbol, symbol].join("")
      );
    }
  };

  const checkWin = (symbol) => {
    if (
      checkHorizontal(0, 3, symbol) ||
      checkHorizontal(3, 6, symbol) ||
      checkHorizontal(6, 9, symbol)
    ) {
      gameover = true;
    }
    if (
      checkVertical(0, symbol) ||
      checkVertical(1, symbol) ||
      checkVertical(2, symbol)
    ) {
      gameover = true;
    }
    if (checkDiagnal(0, symbol) || checkDiagnal(2, symbol)) {
      gameover = true;
    }
  };

  const setInitial = () => {
    gameover = false;
    main.innerHTML = "";
    main.style.filter = "blur(0px)";
    winTextPara.textContent = ``;
    winText.style.zIndex = "-1";
  };

  const setWinner = (string) => {
    main.style.filter = "blur(5px)";
    winTextPara.textContent = string;
    winText.style.zIndex = "3";
  };

  const swapCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  const render = () => {
    setInitial();
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
        if (currentPlayer.human === true) {
          e.target.closest(
            ".cell"
          ).style.backgroundImage = `url('images/${currentPlayer.symbol}.png')`;
          gameBoard[e.target.className[e.target.className.length - 1]] =
            currentPlayer.symbol;
          checkWin(currentPlayer.symbol);
          if (gameover === false) {
            swapCurrentPlayer(player2);
            currentPlayer.makeMove(gameBoard, cells);
            checkWin(currentPlayer.symbol);
            if (gameover === false) {
              swapCurrentPlayer(player1);
            }
          }
        }

        if (
          gameBoard.every(
            (element) =>
              (element === "o" || element === "x") && gameover === false
          )
        ) {
          gameover = "draw";
        }
      }

      if (gameover !== false) {
        gameover === true
          ? setWinner(`${currentPlayer.name} Wins!`)
          : setWinner("Draw");
      }
    };

    cells.forEach((ele) => {
      ele.addEventListener("click", move);
    });
  };

  return { render };
}

function Player(name, symbol, human) {
  this.name = name;
  this.symbol = symbol;
  this.human = human;

  const makeMove = (board, cellsList) => {
    let random = Math.floor(Math.random() * board.length);
    if (board[random] !== "x" && board[random] !== "o") {
      board[random] = symbol;
      cellsList[random].style.backgroundImage = `url('images/${symbol}.png')`;
    } else if (board.some((x) => x === " ")) {
      makeMove(board, cellsList);
    }
  };

  return { makeMove, name, symbol, human };
}

gameBoard = new GameBoard();
gameBoard.render();

winTextBtn.addEventListener("click", () => {
  gameBoard = new GameBoard();
  gameBoard.render();
});
