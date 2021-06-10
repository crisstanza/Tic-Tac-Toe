function Brandom(piece, boardSize) {
	this.piece = piece;
	this.boardSize = boardSize;
}

Brandom.prototype.move = function(board) {
	let foundFree = false;
	while(!foundFree) {
		let line = io.github.crisstanza.Randoms.getInt(0, this.boardSize - 1);
		let column = io.github.crisstanza.Randoms.getInt(0, this.boardSize - 1);
		let tr = board.rows[line];
		let td = tr.cells[column];
		if (!td.innerHTML) {
			td.innerHTML = this.piece;
			td.classList.add('fade-in');
			foundFree = true;
		}
	}
};
