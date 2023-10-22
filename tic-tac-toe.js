"use strict"

let currentPlayer = 0;
let activeSlots = 9;
let boardCells = null;
let gameOver = false;
let status = null;
let defaultStatusMessage = "";

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
					 [0, 3, 6], [1, 4, 7], [2, 5, 8],
					 [0, 4, 8], [2, 4, 6]];


function getPlayerSymbol(player) {
	return player == 0 ? "X" : "O";
}

function activateWin(winner) {
	status.innerHTML = `Congratulations! ${getPlayerSymbol(winner)} is the Winner!`;
	status.classList.add("you-won");
}

function activateDraw(winner) {
	status.innerHTML = `It's a Draw!`;
	status.classList.add("you-won");
}

function changePlayer() {
	currentPlayer = currentPlayer == 0 ? 1 : 0;
}

function moveMade() {
	let winner = -1;

	const symbol = getPlayerSymbol(currentPlayer);
	
	for(let i = 0; i < winPatterns.length; i++) {
		const pattern = winPatterns[i];
		if((boardCells[pattern[0]].innerHTML === symbol) && (boardCells[pattern[1]].innerHTML === symbol) &&
		   (boardCells[pattern[2]].innerHTML === symbol)) {
			winner = currentPlayer;
			gameOver = true;
			break;
		}
	}

	gameOver = gameOver || (activeSlots == 0);
	
	if(gameOver) {
		if(winner != -1) {
			activateWin(winner);
		} else {
			activateDraw();
		}
	} else {
		if(winner != -1) {
			activateWin(winner);
		} else {
			changePlayer();
		}
	}
}

function resetGame(event) {
	currentPlayer = 0;
	activeSlots = 9;
	gameOver = false;

	status.innerHTML = defaultStatusMessage;
	for(var i = 0; i < boardCells.length; i++) {
		boardCells[i].classList.add("square");
		boardCells[i].innerHTML = "";

		boardCells[i].classList.remove("hover");
		boardCells[i].classList.remove("hover.O");
		
		boardCells[i].setAttribute("is_cell", true);
	}

}


document.addEventListener("DOMContentLoaded", (event) => {
	status = document.getElementById("status");
	defaultStatusMessage = status.innerHTML;
	
	const board = document.getElementById("board");
	const cells = board.children;

	for(var i = 0; i < cells.length; i++) {
		cells[i].classList.add("square");
		cells[i].setAttribute("is_cell", true);
	}

	boardCells = cells;

	const resetBtn = document.getElementsByTagName("button")[0];

	resetBtn.addEventListener("click", resetGame);
});

document.addEventListener("click", (event) => {
	const cell = event.srcElement;
	if(!cell.getAttribute("is_cell") || gameOver) return;

	const symbol = getPlayerSymbol(currentPlayer);
	cell.innerHTML = symbol;
	activeSlots--;
	
	moveMade();
});

document.addEventListener("mouseover", (event) => {
	const cell = event.srcElement;
	if(!cell.getAttribute("is_cell") || gameOver) return;

	cell.classList.add("hover");
});

document.addEventListener("mouseout", (event) => {
	const cell = event.srcElement;
	if(!cell.getAttribute("is_cell") || gameOver) return;

	cell.classList.remove("hover");
});
