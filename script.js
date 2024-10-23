let currentPlayer = "X";
let board = Array(9).fill(null);
let history = []; 
let moveIndex = 0; 
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const boardElement = document.getElementById("board");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");


boardElement.style.display = "grid";
boardElement.style.gridTemplateColumns = "repeat(3, 100px)";
boardElement.style.gridTemplateRows = "repeat(3, 100px)";
board.forEach((_, index) => {
  const cell = document.createElement("button");
  cell.style.width = "100px";
  cell.style.height = "100px";
  cell.style.fontSize = "2em";
  cell.addEventListener("click", () => makeMove(index));
  boardElement.appendChild(cell);
});


function makeMove(index) {
  if (!board[index] && moveIndex === history.length) {
    board[index] = currentPlayer;
    history.push([...board]); // Save the board state
    moveIndex++;

    updateBoard();
    checkGameStatus();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}


function updateBoard() {
  const cells = boardElement.children;
  board.forEach((value, index) => {
    cells[index].textContent = value;
    cells[index].disabled = value !== null; 
  });
}


function checkGameStatus() {
  if (checkWinner()) {
    alert(`${currentPlayer} wins!`);
    endGame();
  } else if (board.every(cell => cell !== null)) {
    alert("It's a draw!");
    endGame();
  }
}


function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}


function endGame() {
  prevButton.style.display = "inline-block";
  nextButton.style.display = "inline-block";
  resetButton.style.display = "inline-block";
  moveIndex = history.length - 1;
  updateButtons();
}


function updateButtons() {
  prevButton.disabled = moveIndex <= 0;
  nextButton.disabled = moveIndex >= history.length - 1;
}


prevButton.addEventListener("click", () => {
  if (moveIndex > 0) {
    moveIndex--;
    board = [...history[moveIndex]];
    updateBoard();
    updateButtons();
  }
});


nextButton.addEventListener("click", () => {
  if (moveIndex < history.length - 1) {
    moveIndex++;
    board = [...history[moveIndex]];
    updateBoard();
    updateButtons();
  }
});


resetButton.addEventListener("click", () => {
  board.fill(null);
  history = [];
  moveIndex = 0;
  currentPlayer = "X";
  updateBoard();
  prevButton.style.display = "none";
  nextButton.style.display = "none";
  resetButton.style.display = "none";
});

