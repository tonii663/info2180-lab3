"use strict"

let currentPlayer = 0;

function getPlayerSymbol(player) {
	return player == 0 ? "X" : "O";
}

function changePlayer() {
	currentPlayer = currentPlayer == 0 ? 1 : 0;
}

document.addEventListener("DOMContentLoaded", (event) => {
	let board = document.getElementById("board");
	let cells = board.children;

	for(var i = 0; i < cells.length; i++) {
		cells[i].classList.add("square");
		cells[i].setAttribute("is_cell", true);
	}	
});